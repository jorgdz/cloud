const cleanArray = require('../clean-array')

module.exports = function getEndPoint (dir = undefined) {
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
