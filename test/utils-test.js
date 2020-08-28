'use strict'

const utils = require('../src/utils')
const test = require('ava')

test('Get relative path storage', t => {
  const query = { dir: ['dir1', 'dir2', 'directory3', 'directory4'] }
  const relativePath = utils.getPathFolder(query)
  t.deepEqual(relativePath, '/dir1/dir2/directory3/directory4/')
})

test('Get relative path storage root', t => {
  const query = { dir: '' }
  const relativePath = utils.getPathFolder(query)
  t.deepEqual(relativePath, '/')
})
