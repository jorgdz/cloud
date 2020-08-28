'use strict'

const fs = require('fs')
const config = require('../../config')
const { ConflictException } = require('../exceptions/exceptions')
const path = require('path')

const getContents = function (relativePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(config.directory, relativePath)

    fs.readdir(absolutePath, function (err, files) {
      if (err) reject(new ConflictException('No se ha encontrado un directorio válido para mostrar el contenido.'))

      var contents = []

      if (files && files.length > 0) {
        files.forEach(elem => {
          var subAbsolutePath = path.join(absolutePath, elem)

          if (fs.lstatSync(subAbsolutePath).isDirectory()) {
            var subContents = fs.readdirSync(subAbsolutePath)
            contents.push({ name: elem, type: 'directory', contents: subContents })
          } else {
            contents.push({
              name: elem, type: 'file', size: `${fs.lstatSync(subAbsolutePath).size} bytes`
            })
          }
        })
      }

      resolve(contents)
    })
  })
}

const getPathFolder = function (reqQuery) {
  var pathFolder = '/'
  if (reqQuery.dir && reqQuery.dir !== undefined) {
    if (Array.isArray(reqQuery.dir)) {
      for (let i = 0; i < reqQuery.dir.length; i++) {
        pathFolder += `${reqQuery.dir[i]}/`
      }
    } else {
      pathFolder += `${reqQuery.dir}/`
    }
  }

  return pathFolder
}

const createDir = function (dir) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(config.directory, dir.path)
    const destinyPath = path.join(absolutePath, dir.name)
    fs.readdir(destinyPath, function (err, files) {
      if (err) {
        fs.mkdir(destinyPath,
          { recursive: true }, (error) => {
            if (error) reject(new ConflictException('No se ha creado el directorio en la ruta especificada porque ha ocurrido un conflicto inesperado.'))

            resolve({ name: dir.name, path: dir.path })
          })
      }

      if (files) reject(new ConflictException(`Ya existe un directorio con el nombre ${dir.name}`))
    })
  })
}

module.exports = { getContents, getPathFolder, createDir }
