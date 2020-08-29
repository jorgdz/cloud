const apiFetch = require('../api-fetch')

function cleanArray (currentArray) {
  var newArray = new Array()
  for (var i = 0; i < currentArray.length; i++) {
    if (currentArray[i]) {
      newArray.push(currentArray[i])
    }
  }
  return newArray
}

// Obtener directorio anterio del local storage del browser
const getBeforeDir = function (dir = undefined) {
  var endpoint = '/api/cloud'
  var strPath = localStorage.getItem('storagePath')
  var tmp = null

  if (strPath !== null && strPath !== undefined) {

    tmp = strPath.split('/')
    tmp = cleanArray(tmp)

    if (tmp.length > 0) {
      for (var i = 0; i < tmp.length; i++) {
        if (i === 0) {
          endpoint += `?dir=${tmp[i]}`
        } else {
          endpoint += `&dir=${tmp[i]}`
        }
      }
    }
  }

  if (dir !== undefined) {
    var matches = endpoint.match(/dir=(\w+)/g)

    if (matches !== null) {
      endpoint += `&dir=${dir}`
    } else {
      endpoint += `?dir=${dir}`
    }
  }

  return endpoint
}

module.exports = async function getDirOrFile (ctx, next) {
  try {
    var dir = ctx.params.dir
    var endpoint = getBeforeDir()

    if (dir !== undefined) {
      endpoint = getBeforeDir(dir)
    }

    const data = await apiFetch(endpoint)
    ctx.contents = data

    localStorage.removeItem('storagePath')
    localStorage.setItem('storagePath', data.storagePath)

    next()
  } catch (error) {
    console.log(error)
  }
}
