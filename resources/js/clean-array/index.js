function cleanArray (currentArray) {
  var newArray = new Array()
  for (var i = 0; i < currentArray.length; i++) {
    if (currentArray[i]) {
      newArray.push(currentArray[i])
    }
  }
  return newArray
}

module.exports = cleanArray
