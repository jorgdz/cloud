const Swal = require('sweetalert2')
const apiFetch = require('../api-fetch')
const getEndPoint = require('../end-point')
var page = require('page')
var download = require('downloadjs')

exports.getDirOrFile = async function (ctx, next) {
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

exports.createDirectory = function (data) {
  apiFetch('/api/cloud', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(created => {
      if (created) {
        $('#myModalFolder').modal('toggle')

        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: created.message,
          footer: '<span>Listo !!</span>'
        })
          .then(result => {
            if (result) {
              page.redirect(`/cloud${created.data.path}`)
            }
          })
      }
    })
    .catch(ups => {
      if (ups.response && ups.response.error) {
        var swal = {
          icon: 'error',
          title: `Error ${ups.status}`,
          text: ups.response.error,
          footer: '<span>Algo ha ocurrido.</span>'
        }

        if (ups.response.fields) {
          var html = ''
          if (ups.response.fields.name) {
            html += `<p>${ups.response.fields.name.message}</p>`
          }

          if (ups.response.fields.path) {
            html += `<p>${ups.response.fields.path.message}</p>`
          }

          swal = {
            icon: 'error',
            title: `Error ${ups.status}`,
            html: html,
            footer: `<span>${ups.response.error}</span>`
          }
        }

        Swal.fire(swal)
      }
    })
}

exports.renameDirectory = function (data) {
  Swal.fire({
    title: 'Cambiar nombre',
    input: 'text',
    inputValue: data.oldNameDir,
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (newDir) => {
      const body = { path: data.path, oldNameDir: data.oldNameDir, newNameDir: newDir }

      return apiFetch('/api/cloud', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response
        })
        .catch(error => {
          Swal.showValidationMessage(
            error.response.error
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Ok',
        text: result.message,
        footer: '<span>Listo !!</span>'
      })
        .then(result => {
          if (result) {
            page.redirect(`/cloud${data.path}`)
          }
        })
    }
  })
}

exports.downloadFiles = function (data) {
  fetch("/api/download", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.blob())
    .then(blob => {
      download(blob)
    })
}

exports.deleteDirectory = function (data) {
  apiFetch('/api/cloud', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(created => {
      if (created) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: created.data.message,
          footer: '<span>Listo !!</span>'
        })
          .then(result => {
            if (result) {
              page.redirect(`/cloud${data.path}`)
            }
          })
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.status}`,
        text: error.response.error,
        footer: '<span>Algo ha ocurrido.</span>'
      })
    })
}

exports.deleteFile = function (data) {
  apiFetch('/api/file', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(deleted => {
      if (deleted) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: deleted.data.message,
          footer: `<span>${deleted.message}</span>`
        })
          .then(result => {
            if (result) {
              page.redirect(`/cloud${data.path}`)
            }
          })
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.status}`,
        text: error.response.error,
        footer: '<span>Algo ha ocurrido.</span>'
      })
    })
}

exports.uploadFiles = function (formData) {
  apiFetch('/api/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: response.message,
          footer: '<span>Listo !!</span>'
        })
          .then(result => {
            if (result) {
              page.redirect(`/cloud${response.storagePath}`)
            }
          })
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.status}`,
        text: error.response.error,
        footer: '<span>Algo ha ocurrido.</span>'
      })
    })
}
