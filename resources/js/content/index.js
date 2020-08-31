module.exports = function drawContent (content, storagePath) {
  var elem = document.createElement('div')
  elem.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-6')

  if (content.type === 'directory') {
    var a = document.createElement('a')
    a.innerHTML = `<i class="fa fa-folder"></i> ${content.name}`
    a.href = `/cloud${storagePath}${content.name}`

    elem.appendChild(a)
  } else {
    var ext = content.name.split('.').pop()

    var iconClass = 'fa fa-file'
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif' || ext === 'tiff') {
      iconClass = 'fa fa-image'
    } else if (ext === 'avi' || ext === 'AVI' || ext === 'mp4' || ext === 'MP4' || ext === 'MKV' || ext === 'mkv' || ext === 'FLV' || ext === 'flv' || ext === 'mov' || ext === 'WMV' || ext === 'wmv' || ext === 'MOV') {
      iconClass = 'fa fa-film'
    } else if (ext === 'mp3' || ext === 'mid' || ext === 'midi' || ext === 'wav' || ext === 'wma' || ext === 'cda' || ext === 'ogg' || ext === 'ogm' || ext === 'aac' || ext === 'ac3' || ext === 'flac') {
      iconClass = 'fa fa-music'
    }

    elem.innerHTML = `<i class="${iconClass}"></i> ${content.name}`
  }

  return elem
}
