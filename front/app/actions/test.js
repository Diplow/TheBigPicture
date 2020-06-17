import configureMockStore from 'redux-mock-store'
import React  from 'react'
import thunk from 'redux-thunk'
import { getBigPicture } from './index.js'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import { render } from '@testing-library/react'
import ApiEngine from '../containers/Api'
import { Provider } from 'react-redux'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initStore = require("../../cypress/fixtures/store/init.json")
const addRequestAction = require("../../cypress/fixtures/actions/add_request.json")
const ongoingRequestAction = require("../../cypress/fixtures/actions/ongoing_request.json")


const bpId = 26

describe('async actions', () => {

  it('getBigPicture and expects the appropriate request to be added', () => {
    const store = mockStore(initStore)
    store.dispatch(getBigPicture(bpId))
    expect(store.getActions()).toEqual([addRequestAction])
  })

})
