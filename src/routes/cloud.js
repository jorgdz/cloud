'use strict'

const express = require('express')
const router = express.Router()

const utils = require('../utils')

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
    const created = await utils.createDir({ path, name })
    res.status(201).send({ message: 'Directorio creado.', data: created })
  } catch (error) {
    next(error)
  }
})

module.exports = router
