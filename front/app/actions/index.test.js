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
  postRating,
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
import * as cst from '../constants'

import uuid from 'uuid/v4';

jest.mock('uuid/v4');

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
    const addBpAction = {
      type: cst.actions.ADD_BIG_PICTURE,
      bigpicture: server_resp
    }
    const bpCreatedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemCreation.bigpictures
    }

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
    const addBpAction = {
      type: cst.actions.ADD_BIG_PICTURE,
      bigpicture: server_resp
    }
    const bpPatchedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemModification.bigpictures
    }
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

  it('deleteBigPicture and expects the appropriate actions', () => {
    const bpId = 265
    const deleteBpAction = {
      type: cst.actions.DELETE_BIG_PICTURE,
      id: bpId
    }
    const bpDeletedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemDeletion.bigpictures
    }
    fetchMock.deleteOnce('https://api.vuedensemble.org/api/bigpictures/265/', { status: 204 })
    testFetchActions(
      deleteBigPicture,
      [bpId],
      [deleteBpAction, bpDeletedNotif],
      mockStore(initStore)
    )
  })

  it('getSubjects and expects the appropriate actions', () => {
    const page = 1
    const options = { favorites: false }
    const requestId = "340ed280-8b39-4b08-aa1b-af8b597f5bc8"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_subjects.json")
    testDispatchActions(
      getSubjects,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getOwnSubjects and expects the appropriate actions', () => {
    const page = 1
    const options = { favorites: false, author: "1" }
    const requestId = "c75beb1b-6343-41ad-8779-ef7ce843de1d"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_own_subjects.json")
    testDispatchActions(
      getOwnSubjects,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getBigPictureResults and expects the appropriate actions', () => {
    uuid.mockImplementation(() => 'd5b94980-f6ee-4af5-a717-bed38d1c4468')
    const bpId = 26
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_bigpicture_results_26.json")
    testDispatchActions(
      getBigPictureResults,
      [bpId],
      [addRequestAction],
      mockStore(initStore)
    )
  })


  it('postRating and expects the appropriate actions', () => {
    const rating = {
      body: "lololololo",
      target_bp: 266,
      author_id: 1,
      subject: 266
    }
    const server_resp = require("../../cypress/fixtures/api/post/rating_34.json")
    const addRatingAction = {
      type: cst.actions.ADD_RATING,
      rating: server_resp
    }
    const ratingCreatedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemCreation.ratings
    }

    fetchMock.postOnce(
      'https://api.vuedensemble.org/api/ratings/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' },
        status: 201
      }
    )
    testFetchActions(
      postRating,
      [rating],
      [addRatingAction, ratingCreatedNotif],
      mockStore(initStore)
    )
  })
})
