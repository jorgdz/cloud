module.exports = function drawContent (content, storagePath) {
  var elem = document.createElement('div')
  elem.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-6')

  if (content.type === 'directory') {
    var a = document.createElement('a')
    a.innerHTML = `<i class="fa fa-folder"></i> ${content.name}`
    a.href = `/cloud${storagePath}${content.name}`

    elem.appendChild(a)
  } else {
    elem.innerHTML = `<i class="fa fa-file"></i> ${content.name}`
  }

  return elem
}
