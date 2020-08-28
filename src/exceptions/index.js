'use strict'

const { MethodArgumentNotValidException } = require('./exceptions')

exports.handler = function (err, req, res, next) {
  console.log(err.message)

  var response = {}
  if (err instanceof MethodArgumentNotValidException) {
    console.log(err.fields)

    response = {
      timestamps: new Date(),
      exception: err.name,
      status: err.status || 500,
      error: err.message,
      fields: err.fields,
      path: req.url
    }
  } else {
    response = {
      timestamps: new Date(),
      exception: err.name,
      status: err.status || 500,
      error: err.message,
      path: req.url
    }
  }

  return res.status(err.status || 500).json(response)
}
