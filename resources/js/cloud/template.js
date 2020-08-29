module.exports = function (data) {
  var div = document.createElement('div')
  var routeDir = document.createElement('span')
  routeDir.textContent = data.storagePath

  var lista = document.createElement('ul')
  var fg = document.createDocumentFragment()

  data.contents.forEach(content => {
    var elem = document.createElement('li')

    if (content.type === 'directory') {
      var a = document.createElement('a')
      a.textContent = content.name
      a.href = `/cloud/${content.name}`

      elem.appendChild(a)
    } else {
      elem.textContent = content.name
    }

    fg.appendChild(elem)
  })

  lista.appendChild(fg)
  div.appendChild(routeDir)
  div.appendChild(lista)
  return div
}
