const apiFetch = require('../../api-fetch')
const Swal = require('sweetalert2')
var page = require('page')
var cleanArray = require('../../clean-array')

const helperRouteDir = function (arrayDir, indexDir) {
  var route = ''
  arrayDir.forEach((a, index) => {
    if (index <= indexDir) {
      route += `/${a}`
    }
  })

  return route
}

const navigateDirectory = function (dir) {
  var arrayDir = dir.split('/')
  arrayDir = cleanArray(arrayDir)
  var spanDir = document.createElement('span')
  var fg = document.createDocumentFragment()

  for (var j = 0; j < arrayDir.length; j++) {
    var a = document.createElement('a')
    a.href = `/cloud${helperRouteDir(arrayDir, j)}`
    a.innerHTML = ` <i class="fa fa-angle-right"></i>  ${arrayDir[j]}`
    fg.appendChild(a)
  }

  spanDir.appendChild(fg)
  return spanDir
}

module.exports = function createFolder (directory) {
  var btnOpenModal = document.createElement('button')
  btnOpenModal.classList.add('btn', 'btn-primary')
  btnOpenModal.textContent = 'Crear carpeta'
  btnOpenModal.setAttribute('data-toggle', 'modal')
  btnOpenModal.setAttribute('data-target', '#myModalFolder')

  var div = document.createElement('div')
  div.appendChild(btnOpenModal)

  div.append(' : ')
  var root = document.createElement('a')
  root.href = '/cloud'
  root.textContent = 'Disco principal '
  div.appendChild(root)
  div.appendChild(navigateDirectory(directory))

  var modal = document.createElement('div')
  modal.classList.add('modal', 'fade')
  modal.id = 'myModalFolder'
  modal.tabIndex = '-1'
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-labelledby', 'myModalLabel')

  var modalDialog = document.createElement('div')
  modalDialog.classList.add('modal-dialog')
  modalDialog.setAttribute('role', 'document')

  var modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')

  // Modal Header
  var modalHeader = document.createElement('div')
  modalHeader.classList.add('modal-header')

  var btnHeaderModal = document.createElement('button')
  btnHeaderModal.type = 'button'
  btnHeaderModal.classList.add('close')
  btnHeaderModal.setAttribute('data-dismiss', 'modal')
  btnHeaderModal.setAttribute('aria-label', 'Close')

  var spanHeaderHidden = document.createElement('span')
  spanHeaderHidden.setAttribute('aria-hidden', 'true')
  spanHeaderHidden.innerHTML = '&times;'

  btnHeaderModal.appendChild(spanHeaderHidden)

  var modalTitle = document.createElement('h4')
  modalTitle.classList.add('modal-title')
  modalTitle.id = 'myModalLabel'
  modalTitle.textContent = 'Nueva Carpeta'

  // Modal body
  var modalBody = document.createElement('div')
  modalBody.classList.add('modal-body')

  var inputHiddenPath = document.createElement('input')
  inputHiddenPath.type = 'hidden'
  inputHiddenPath.id = 'path'
  inputHiddenPath.value = directory

  var formGroupBody = document.createElement('div')
  formGroupBody.classList.add('form-group')

  var lblName = document.createElement('label')
  lblName.setAttribute('for', 'name')
  lblName.classList.add('control-label')
  lblName.textContent = 'Nombre de la carpeta'

  var inputNameFolder = document.createElement('input')
  inputNameFolder.type = 'text'
  inputNameFolder.classList.add('form-control')
  inputNameFolder.id = 'name'

  formGroupBody.appendChild(lblName)
  formGroupBody.appendChild(inputNameFolder)

  modalBody.appendChild(inputHiddenPath)
  modalBody.appendChild(formGroupBody)

  // Modal Footer
  var modalFooter = document.createElement('div')
  modalFooter.classList.add('modal-footer')

  var btnFooterClose = document.createElement('button')
  btnFooterClose.type = 'button'
  btnFooterClose.classList.add('btn', 'btn-default')
  btnFooterClose.setAttribute('data-dismiss', 'modal')
  btnFooterClose.textContent = 'Cerrar'

  var btnFooterSend = document.createElement('button')
  btnFooterSend.type = 'button'
  btnFooterSend.id = 'btnSend'
  btnFooterSend.classList.add('btn', 'btn-success')
  btnFooterSend.textContent = 'Crear'



  // Create a new Folder
  btnFooterSend.addEventListener('click', function () {
    var data = { path: directory, name: inputNameFolder.value }

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
  })



  modalFooter.appendChild(btnFooterClose)
  modalFooter.appendChild(btnFooterSend)

  // Append child elems in modal
  modalHeader.appendChild(btnHeaderModal)
  modalHeader.appendChild(modalTitle)
  modalContent.appendChild(modalHeader)
  modalContent.appendChild(modalBody)
  modalContent.appendChild(modalFooter)
  modalDialog.appendChild(modalContent)
  modal.appendChild(modalDialog)

  div.appendChild(modal)
  return div
}
