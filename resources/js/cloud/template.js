const drawContent = require('../content')
const createFolder = require('./create-folder')
const { uploadFiles } = require('./services')

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
    document.getElementById('my-menu3').classList.remove('show')

    document.getElementById('my-menu2').classList.add('show')
    document.getElementById('rmenu2').style.top = e.clientY + 'px'
    document.getElementById('rmenu2').style.left = e.clientX + 'px'

    // Crear input file
    var fileName = document.querySelector('#fileName')
    fileName.innerHTML = ''

    var fileNameSpan = document.createElement('span')
    var iconNameSpan = document.createElement('i')
    iconNameSpan.classList.add('fa', 'fa-upload')
    fileNameSpan.appendChild(iconNameSpan)
    fileNameSpan.append(' Subir archivo')
    var inputFileName = document.createElement('input')
    inputFileName.type = 'file'
    inputFileName.multiple = 'multiple'
    inputFileName.name = 'files'
    inputFileName.id = 'filesSystem'
    inputFileName.classList.add('upload')

    fileName.appendChild(fileNameSpan)
    fileName.appendChild(inputFileName)

    // Subir archivos
    document.querySelector('#uploadFile').onclick = function (e) {

      inputFileName.addEventListener('change', function (event) {
        event.stopPropagation()

        var formData = new FormData()
        for (var x = 0; x < inputFileName.files.length; x++) {
          formData.append("elems", inputFileName.files[x]);
        }

        formData.append('path', data.storagePath)

        uploadFiles(formData)
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
