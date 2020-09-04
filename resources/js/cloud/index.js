var page = require('page')
var title = require('title')
const template = require('./template')
const { getDirOrFile } = require('./services')
const empty = require('empty-element')

page('/cloud/:dir(.*)?', getDirOrFile, function (ctx, next) {
  var titlePage = 'Cloud'

  if (ctx.params.dir) {
    titlePage = `Cloud - ${ctx.params.dir}`
  }

  title(titlePage)
  var root = document.querySelector('#root')
  empty(root).appendChild(template(ctx.contents))

  // Deshabilitar click derecho en el main
  root.oncontextmenu = function (e) {
    return false
  }

  // Ocultar el Context-Menu personalizado al hacer click en cualquier parte de la página
  document.onclick = function (event) {
    document.getElementById('my-menu1').classList.remove('show')
    document.getElementById('my-menu2').classList.remove('show')
    document.getElementById('my-menu3').classList.remove('show')
  }
})
