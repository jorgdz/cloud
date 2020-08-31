'use strict'

const fs = require('fs')
const rimraf = require('rimraf')
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
  if (reqQuery.dir && reqQuery.dir !== undefined && reqQuery.dir !== null && reqQuery.dir !== '') {
    if (Array.isArray(reqQuery.dir)) {
      for (let i = 0; i < reqQuery.dir.length; i++) {
        if (reqQuery.dir[i] !== undefined && reqQuery.dir[i] !== null && reqQuery.dir[i] !== '') {
          pathFolder += `${reqQuery.dir[i]}/`
        }
      }
    } else {
      pathFolder += `${reqQuery.dir}/`
    }
  }

  return pathFolder
}

const createDir = function (dir = {}) {
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

const deleteDir = function (dir) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(config.directory, dir.path)
    const destinyPath = path.join(absolutePath, dir.name)

    rimraf(destinyPath, function (err) {
      if (err) reject(new ConflictException(`Ha ocurrido un error al intentar eliminar '${dir.name}', por favor intente luego.`))

      resolve({ message: 'Elemento borrado.' })
    })
  })
}

const uplaodFiles = async function (req) {
  var elems = req.files.elems
  const filePath = req.body.path

  if (Array.isArray(elems)) {
    var arrayElems = []

    for (var i = 0; i < elems.length; i++) {
      arrayElems.push(await upload(elems[i], filePath))
    }

    return Promise.resolve({ message: 'Se han agregado nuevos archivos.', storagePath: filePath, data: arrayElems })
  } else {
    const uploaded = await upload(elems, filePath)
    return Promise.resolve({ message: 'Se ha subido un nuevo archivo.', storagePath: filePath, data: uploaded })
  }
}

const upload = function (elem, destinyPath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(config.directory, destinyPath)

    elem.mv(`${absolutePath}${elem.name}`, function (err) {
      if (err) reject(new ConflictException('No se ha podido subir el archivo, por favor intente luego.'))

      resolve({
        name: elem.name,
        size: elem.size,
        mimetype: elem.mimetype
      })
    })
  })
}

module.exports = { getContents, getPathFolder, createDir, uplaodFiles, deleteDir }
