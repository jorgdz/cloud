const drawContent = require('../content')
const createFolder = require('./create-folder')
const Swal = require('sweetalert2')
const apiFetch = require('../api-fetch')

module.exports = function (data) {
  var panel = document.createElement('div')
  panel.classList.add('panel', 'panel-info', 'listContent')

  var panelHeading = document.createElement('div')
  panelHeading.classList.add('panel-heading')
  panelHeading.appendChild(createFolder(data.storagePath))

  var panelBody = document.createElement('div')
  panelBody.classList.add('panel-body')
  panelBody.id = 'panel-content'

  // Creando la lista de directorios y archivos
  var lista = document.createElement('div')
  lista.classList.add('row')
  var fg = document.createDocumentFragment()

  panelBody.oncontextmenu = function (e) {
    document.getElementById('my-menu1').classList.remove('show')

    document.getElementById('my-menu2').classList.add('show')
    document.getElementById('rmenu2').style.top = e.clientY + 'px'
    document.getElementById('rmenu2').style.left = e.clientX + 'px'

    // Subir archivos
    var filesSystem = document.querySelector('#filesSystem')

    document.querySelector('#uploadFile').onclick = function (e) {
      filesSystem.addEventListener('change', function (event) {
        event.stopPropagation()

        var formData = new FormData()
        for (var x = 0; x < filesSystem.files.length; x++) {
          formData.append("elems", filesSystem.files[x]);
        }

        formData.append('path', data.storagePath)

        apiFetch('/api/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            if (response) {
              Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: response.message,
                footer: '<span>Listo !!</span>'
              })
                .then(result => {
                  if (result) {
                    location.reload()
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
      }, false)
    }

    window.event.returnValue = false
  }

  // Draw content directory
  data.contents.forEach(content => {
    fg.appendChild(drawContent(content, data.storagePath))
  })

  lista.appendChild(fg)
  panelBody.appendChild(lista)
  panel.appendChild(panelHeading)
  panel.appendChild(panelBody)
  return panel
}
