const drawContent = require('../content')
const createFolder = require('./create-folder')

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

  // Draw content directory
  data.contents.forEach(content => {
    fg.appendChild(drawContent(content, data.storagePath))
  })

  panelBody.oncontextmenu = function (e) {
    document.getElementById('my-menu1').classList.remove('show')

    document.getElementById('my-menu2').classList.add('show')
    document.getElementById('rmenu2').style.top = e.clientY + 'px'
    document.getElementById('rmenu2').style.left = e.clientX + 'px'

    document.querySelector('#uploadFile').onclick = function () {
      console.log('Path:', data.storagePath)
    }

    window.event.returnValue = false
  }

  lista.appendChild(fg)
  panelBody.appendChild(lista)
  panel.appendChild(panelHeading)
  panel.appendChild(panelBody)
  return panel
}
