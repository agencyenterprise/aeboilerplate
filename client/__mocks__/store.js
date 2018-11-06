'use strict'

const store = jest.genMockFromModule('store')

let returnedValue

function get() {
  return returnedValue
}

function setReturnedValue(value) {
  returnedValue = value
}

store.setReturnedValue = setReturnedValue
store.get = get

module.exports = store
