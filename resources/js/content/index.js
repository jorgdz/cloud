var page = require('page')
const { downloadFiles, deleteFile, deleteDirectory, renameDirectory } = require('../cloud/services')

module.exports = function drawContent (content, storagePath) {
  var elem = document.createElement('div')
  elem.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-6')

  if (content.type === 'directory') {
    var a = document.createElement('a')
    a.innerHTML = `<i class="fa fa-folder"></i> ${content.name} <b>(${content.contents.length} ${(content.contents.length > 2 || content.contents.length === 0) ? 'elems' : 'elem'})</b>`
    a.id = 'directory'
    a.href = `/cloud${storagePath}${content.name}`

    // Menu contextual de cada directorio
    a.oncontextmenu = function (e) {
      document.getElementById('my-menu2').classList.remove('show')
      document.getElementById('my-menu3').classList.remove('show')

      document.querySelector('#panel-content').oncontextmenu = function (event) {
        return false
      }

      document.getElementById('my-menu1').classList.add('show')
      document.getElementById('rmenu1').style.top = e.clientY + 'px'
      document.getElementById('rmenu1').style.left = e.clientX + 'px'

      // Eliminar directorio
      document.querySelector('#deleteFolder').onclick = function () {
        const data = { path: storagePath, name: content.name }

        deleteDirectory(data)
      }

      // Renombar directorio
      document.querySelector('#renameFolder').onclick = function () {
        const data = { path: storagePath, oldNameDir: content.name }

        renameDirectory(data)
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

    var span = document.createElement('span')
    span.innerHTML = `<i class="${iconClass}"></i> ${content.name}`
    span.id = 'fileDirectory'
    span.classList.add('fileStyleList')

    // Menu contextual de cada archivo
    span.oncontextmenu = function (e) {
      document.getElementById('my-menu2').classList.remove('show')
      document.getElementById('my-menu1').classList.remove('show')

      document.querySelector('#panel-content').oncontextmenu = function (event) {
        return false
      }

      document.getElementById('my-menu3').classList.add('show')
      document.getElementById('rmenu3').style.top = e.clientY + 'px'
      document.getElementById('rmenu3').style.left = e.clientX + 'px'

      // Eliminar archivo
      document.querySelector('#deleteFile').onclick = function () {
        const data = { path: storagePath, name: content.name }

        deleteFile(data)
      }

      // Descargar archivo
      document.querySelector('#downloadFile').onclick = function () {
        const data = { path: storagePath, name: content.name }

        downloadFiles(data)
      }

      window.event.returnValue = false
      page.redirect(`/cloud${storagePath}`)
    }

    elem.appendChild(span)
  }

  return elem
}
