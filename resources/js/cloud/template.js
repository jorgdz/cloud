const drawContent = require('../content')

module.exports = function (data) {
  var panel = document.createElement('div')
  panel.classList.add('panel', 'panel-info', 'listContent')

  var routeDir = document.createElement('div')
  routeDir.classList.add('panel-heading')
  routeDir.textContent = data.storagePath

  var panelBody = document.createElement('div')
  panelBody.classList.add('panel-body')

  // Creando la lista de directorios y archivos
  var lista = document.createElement('div')
  lista.classList.add('row')
  var fg = document.createDocumentFragment()

  data.contents.forEach(content => {
    fg.appendChild(drawContent(content, data.storagePath))
  })

  lista.appendChild(fg)
  panelBody.appendChild(lista)
  panel.appendChild(routeDir)
  panel.appendChild(panelBody)
  return panel
}
