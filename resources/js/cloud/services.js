const Swal = require('sweetalert2')
const apiFetch = require('../api-fetch')
const cleanArray = require('../clean-array')

const getEndPoint = function (dir = undefined) {
  var endpoint = '/api/cloud'
  var tmp = null

  if (dir !== null && dir !== undefined) {
    tmp = dir.split('/')
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

  return endpoint
}

module.exports = async function getDirOrFile (ctx, next) {
  try {
    var dir = ctx.params.dir
    var endpoint = getEndPoint()

    if (dir !== undefined) {
      endpoint = getEndPoint(dir)
    }

    const data = await apiFetch(endpoint)
    ctx.contents = data

    next()
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: `Error ${error.status}`,
      text: error.response.error,
      footer: '<span>Algo ha ocurrido.</span>'
    }).then(result => {
      if (result.value) {
        window.history.back()
      }
    })
  }
}
