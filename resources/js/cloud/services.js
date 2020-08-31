const Swal = require('sweetalert2')
const apiFetch = require('../api-fetch')
const getEndPoint = require('../end-point')

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
