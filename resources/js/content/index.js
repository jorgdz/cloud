var page = require('page')
const Swal = require('sweetalert2')
var apiFetch = require('../api-fetch')

module.exports = function drawContent (content, storagePath) {
  var elem = document.createElement('div')
  elem.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-6')

  if (content.type === 'directory') {
    var a = document.createElement('a')
    a.innerHTML = `<i class="fa fa-folder"></i> ${content.name}`
    a.id = 'directory'
    a.href = `/cloud${storagePath}${content.name}`

    a.oncontextmenu = function (e) {
      document.getElementById('my-menu2').classList.remove('show')

      document.querySelector('#panel-content').oncontextmenu = function (event) {
        return false
      }

      document.getElementById('my-menu1').classList.add('show')
      document.getElementById('rmenu1').style.top = e.clientY + 'px'
      document.getElementById('rmenu1').style.left = e.clientX + 'px'

      // Eliminar directorio
      document.querySelector('#deleteFolder').onclick = function () {
        const data = { path: storagePath, name: content.name }
        apiFetch('/api/cloud', {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(created => {
            if (created) {
              Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: created.data.message,
                footer: '<span>Listo !!</span>'
              })
                .then(result => {
                  if (result) {
                    page.redirect(`/cloud${storagePath}`)
                  }
                })
            }
          }).catch(error => {
            Swal.fire({
              icon: 'error',
              title: `Error ${error.status}`,
              text: error.response.error,
              footer: '<span>Algo ha ocurrido.</span>'
            })
          })
      }

      window.event.returnValue = false
      page.redirect(`/cloud${storagePath}`)
    }

    elem.appendChild(a)
  } else {
    var ext = content.name.split('.').pop()

    var iconClass = 'fa fa-file'
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif' || ext === 'tiff') {
      iconClass = 'fa fa-image'
    } else if (ext === 'avi' || ext === 'AVI' || ext === 'mp4' || ext === 'MP4' || ext === 'MKV' || ext === 'mkv' || ext === 'FLV' || ext === 'flv' || ext === 'mov' || ext === 'WMV' || ext === 'wmv' || ext === 'MOV') {
      iconClass = 'fa fa-film'
    } else if (ext === 'mp3' || ext === 'mid' || ext === 'midi' || ext === 'wav' || ext === 'wma' || ext === 'cda' || ext === 'ogg' || ext === 'ogm' || ext === 'aac' || ext === 'ac3' || ext === 'flac') {
      iconClass = 'fa fa-music'
    }

    elem.innerHTML = `<i class="${iconClass}"></i> ${content.name}`
  }

  return elem
}
