
import reducer from './ratings.js'
import expect from 'expect'
import * as cst from '../constants'


describe('rating reducer', () => {

  const rating = {
    "id":118,
    "author":1,
    "author_id":1,
    "basisCount":0,
    "ratingCount":0,
    "date":"2020-08-17",
    "modification_date":"2020-08-17T15:14:49.951889Z",
    "body":"test",
    "target_bp":26,
    "target_rating":null,
    "subject":26,
    "new":true
  }

  it('add rating', () => {
    const action = require("../../cypress/fixtures/actions/create_rating.json")
    const initStore = []
    const store = [rating]
    expect(reducer(initStore, action)).toEqual(store)
  })

})
