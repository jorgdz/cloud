'use strict'

const express = require('express')
const router = express.Router()

const utils = require('../utils')
const { BadRequestException } = require('../exceptions/exceptions')
const { validateFields } = require('../exceptions/lib')

router.get('/cloud', async function (req, res, next) {
  try {
    const relativePath = utils.getPathFolder(req.query)
    const contents = await utils.getContents(relativePath)
    res.status(200).send({ storagePath: relativePath, contents })
  } catch (error) {
    next(error)
  }
})

router.post('/cloud', async function (req, res, next) {
  try {
    const { path, name } = req.body
    const body = { path, name }

    // Validate fields
    await validateFields(body, {
      name: 'required|alphaDash',
      path: 'required'
    })

    const created = await utils.createDir({ path, name })
    res.status(201).send({ message: 'Directorio creado.', data: created })
  } catch (error) {
    next(error)
  }
})

router.put('/cloud', async function (req, res, next) {
  try {
    const { oldNameDir, newNameDir, path } = req.body
    const body = { oldNameDir, newNameDir, path }

    // Validate fields
    await validateFields(body, {
      oldNameDir: 'required|alphaDash',
      newNameDir: 'required|alphaDash',
      path: 'required'
    })

    const data = {
      oldDir: `${path}${oldNameDir}`,
      newDir: `${path}${newNameDir}`
    }

    const renamed = await utils.renameDir(data)
    res.status(201).send(renamed)
  } catch (error) {
    next(error)
  }
})

router.delete('/cloud', async function (req, res, next) {
  try {
    const { path, name } = req.body

    const deleted = await utils.deleteDir({ path, name })
    res.status(201).send({ message: 'Listo.', data: deleted })
  } catch (error) {
    next(error)
  }
})

router.post('/upload', async function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new BadRequestException('No hay archivos pendientes para subir.')
    }
    const uploaded = await utils.uplaodFiles(req)

    res.status(201).send(uploaded)
  } catch (error) {
    next(error)
  }
})

router.post('/download', function (req, res, next) {
  try {
    const { path, name } = req.body
    utils.downloadFile(res, { path, name })
  } catch (error) {
    next(error)
  }
})

router.delete('/file', async function (req, res, next) {
  try {
    const { path, name } = req.body
    const deleted = await utils.deleteFile({ path, name })
    res.status(201).send({ message: 'Listo.', data: deleted })
  } catch (error) {
    next(error)
  }
})

module.exports = router
