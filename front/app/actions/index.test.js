import configureMockStore from 'redux-mock-store'
import React  from 'react'
import thunk from 'redux-thunk'
import {
  getBigPicture,
  postBigPicture,
  patchBigPicture,
  deleteBigPicture,
  getSubjects,
  getOwnSubjects,
  getBigPictureResults,
  postVote,
  patchRating,
  deleteVote,
  getRating,
  getRatings,
  getOwnRatings,
  getRatingResults,
  getEndorsments,
  postEndorsment,
  deleteEndorsment,
  getUser,
  patchUser,
  getSubscriptions,
  unfollow,
  follow
} from './index.js'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import { render } from '@testing-library/react'
import ApiEngine from '../containers/Api'
import { Provider } from 'react-redux'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initStore = require("../../cypress/fixtures/store/init.json")
const ongoingRequestAction = require("../../cypress/fixtures/actions/ongoing_request.json")


const testFetchActions = (asyncAction, args, expectedActions, store) => {
  store.dispatch(asyncAction(...args)).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
}

const testDispatchActions = (dispatchAction, args, expectedActions, store) => {
  store.dispatch(dispatchAction(...args))
  expect(store.getActions()).toEqual(expectedActions)
}

describe('high level actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('getBigPicture and expects the appropriate actions', () => {
    const bpId = 26
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_bigpicture_26.json")
    testDispatchActions(
      getBigPicture,
      [bpId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('postBigPicture and expects the appropriate actions', () => {
    const bp = {
      title: "test",
      body: "gogogogo",
      kind: 1,
      author_id: 1,
      private: false
    }
    const server_resp = require("../../cypress/fixtures/api/post/bp_265.json")
    const addBpAction = require("../../cypress/fixtures/actions/add_big_picture/bp_265.json")
    const bpCreatedNotif = require("../../cypress/fixtures/actions/notifications/created_bp_success.json")

    fetchMock.postOnce(
      'https://api.vuedensemble.org/api/bigpictures/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' }
      }
    )
    testFetchActions(
      postBigPicture,
      [bp],
      [addBpAction, bpCreatedNotif],
      mockStore(initStore)
    )
  })

  it('patchBigPicture and expects the appropriate actions', () => {
    const bp = { id: 265, body: "gaga" }
    const server_resp = require("../../cypress/fixtures/api/post/bp_265.json")
    const addBpAction = require("../../cypress/fixtures/actions/add_big_picture/bp_265.json")
    const bpPatchedNotif = require("../../cypress/fixtures/actions/notifications/patched_bp_success.json")
    fetchMock.patchOnce(
      'https://api.vuedensemble.org/api/bigpictures/265/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' }
      }
    )
    testFetchActions(
      patchBigPicture,
      [bp],
      [addBpAction, bpPatchedNotif],
      mockStore(initStore)
    )
  })

})
