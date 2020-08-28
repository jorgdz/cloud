'use strict'

class BadRequestException extends Error {
  constructor (message) {
    super(message)
    this.name = 'Bad request'
    this.status = 400
  }
}

class ConflictException extends Error {
  constructor (message) {
    super(message)
    this.name = 'Conflict exception'
    this.status = 409
  }
}

class ForbiddenException extends Error {
  constructor (message) {
    super(message)
    this.name = 'Forbidden exception'
    this.status = 403
  }
}

class NotFoundException extends Error {
  constructor (message) {
    super(message)
    this.name = 'Not found'
    this.status = 404
  }
}

class MethodArgumentNotValidException extends Error {
  constructor (message, errorFields) {
    super(message)
    this.name = 'Method argument not valid exception'
    this.status = 400
    this.fields = errorFields
  }
}

module.exports = { BadRequestException, ConflictException, ForbiddenException, NotFoundException, MethodArgumentNotValidException }
