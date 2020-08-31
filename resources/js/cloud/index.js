var page = require('page')
var title = require('title')
const template = require('./template')
const services = require('./services')
const empty = require('empty-element')

page('/cloud/:dir(.*)?', services, function (ctx, next) {
  var titlePage = 'Cloud'

  if (ctx.params.dir) {
    titlePage = `Cloud - ${ctx.params.dir}`
  }

  title(titlePage)
  var root = document.querySelector('#root')

  empty(root).appendChild(template(ctx.contents))
})
