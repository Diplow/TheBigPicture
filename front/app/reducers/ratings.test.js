
import reducer from './ratings.js'
import expect from 'expect'
import * as cst from '../constants'


describe('rating reducer', () => {

  const rating = {
    "id":39,
    "author":1,
    "author_id":1,
    "basisCount":0,
    "date":"2020-06-21",
    "body":"test",
    "target_bp":26,
    "target_rating":null,
    "subject":26
  }

  it('add rating', () => {
    const action = require("../../cypress/fixtures/actions/add_rating.json")
    const initStore = []
    const store = [rating]
    expect(reducer(initStore, action)).toEqual(store)
  })

})
