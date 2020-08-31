'use strict'

const { createDir, getPathFolder, deleteDir } = require('../src/utils')
const test = require('ava')

test('Get relative path storage', t => {
  const query = { dir: ['dir1', 'dir2', 'directory3', 'directory4'] }
  const relativePath = getPathFolder(query)
  t.deepEqual(relativePath, '/dir1/dir2/directory3/directory4/')
})

test('Get relative path storage root', t => {
  const query = { dir: '' }
  const relativePath = getPathFolder(query)
  t.deepEqual(relativePath, '/')
})

test('Exist delete directory', t => {
  t.is(typeof deleteDir, 'function', 'deleteDir is a function')
})

test('Create a new directory', async t => {
  t.is(typeof createDir, 'function', 'createDir is a function')

  const dir = {
    path: '/',
    name: 'folder-Test1'
  }

  const created = await createDir(dir)
  await deleteDir(dir)

  t.is(created.name, dir.name)
})
