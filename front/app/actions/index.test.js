import configureMockStore from 'redux-mock-store'
import React  from 'react'
import thunk from 'redux-thunk'
import {
  getCategories,
  getBigPicture,
  postBigPicture,
  patchBigPicture,
  deleteBigPicture,
  getSubjects,
  getOwnSubjects,
  getBigPictureResults,
  postRating,
  patchRating,
  deleteRating,
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

  it('getCategories', () => {
    const page = 1
    const options = { favorites: false }
    const requestId = "340ed280-8b39-4b08-aa1b-af8b597f5bc8"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_categories.json")
    testDispatchActions(
      getCategories,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getBigPicture', () => {
    const bpId = 26
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_bigpicture_26.json")
    testDispatchActions(
      getBigPicture,
      [bpId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('postBigPicture', () => {
    const bp = {
      title: "test",
      body: "gogogogo",
      kind: 1,
      author_id: 1,
      private: false
    }
    const server_resp = require("../../cypress/fixtures/api/post/bp_265.json")
    const addBpAction = {
      type: cst.actions.CREATE_BIG_PICTURE,
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
        headers: { 'content-type': 'application/json' },
        status: 201
      }
    )
    testFetchActions(
      postBigPicture,
      [bp],
      [addBpAction, bpCreatedNotif],
      mockStore(initStore)
    )
  })

  it('patchBigPicture', () => {
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

  it('deleteBigPicture', () => {
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

  it('getSubjects', () => {
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

  it('getOwnSubjects', () => {
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

  it('getBigPictureResults', () => {
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


  it('postRating', () => {
    const rating = {
      body: "lololololo",
      target_bp: 266,
      author_id: 1,
      subject: 266
    }
    const server_resp = require("../../cypress/fixtures/api/post/rating_34.json")
    const addRatingAction = {
      type: cst.actions.CREATE_RATING,
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


  it('patchRating', () => {
    const rating = { id: 34, body: "lalala" }
    const server_resp = require("../../cypress/fixtures/api/post/rating_34.json")
    const addRatingAction = {
      type: cst.actions.ADD_RATING,
      rating: server_resp
    }
    const ratingPatchedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemModification.ratings
    }
    fetchMock.patchOnce(
      'https://api.vuedensemble.org/api/ratings/34/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' }
      }
    )
    testFetchActions(
      patchRating,
      [rating],
      [addRatingAction, ratingPatchedNotif],
      mockStore(initStore)
    )
  })

  it('deleteRating', () => {
    const ratingId = 34
    const deleteRatingAction = {
      type: cst.actions.DELETE_RATING,
      id: ratingId
    }
    const ratingDeletedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemDeletion.ratings
    }
    fetchMock.deleteOnce('https://api.vuedensemble.org/api/ratings/34/', { status: 204 })
    testFetchActions(
      deleteRating,
      [ratingId],
      [deleteRatingAction, ratingDeletedNotif],
      mockStore(initStore)
    )
  })

  it('getRating', () => {
    const ratingId = 34
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_rating_34.json")
    testDispatchActions(
      getRating,
      [ratingId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getRatings', () => {
    const page = 1
    const options = { favorites: false, rating: 34 }
    const requestId = "f312a353-f418-4f46-b922-b223ffb4b35d"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_ratings.json")
    testDispatchActions(
      getRatings,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getOwnRatings', () => {
    const page = 1
    const options = { favorites: false, author: "1" }
    const requestId = "f22bf6c1-600f-4f3c-9a4e-5f55b01d67c7"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_own_ratings.json")
    testDispatchActions(
      getOwnRatings,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getRatingResults', () => {
    uuid.mockImplementation(() => '2af025c2-7f24-43ff-8faf-5e2e74d9eec5')
    const ratingId = 34
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_rating_results_34.json")
    testDispatchActions(
      getRatingResults,
      [ratingId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('getEndorsments', () => {
    const page = 1
    const options = { favorites: false, rating: 34 }
    const requestId = "925215af-b083-4228-b900-f82a2a93e16c"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_endorsments.json")
    testDispatchActions(
      getEndorsments,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('postEndorsment', () => {
    const endorsment = {
      author_id: 1,
      bigpicture: null,
      rating: 35,
      reason: "loolobababa",
      target_id: 36,
      value: 3
    }
    const server_resp = require("../../cypress/fixtures/api/post/endorsment_18.json")
    const addEndorsmentAction = {
      type: cst.actions.ADD_ENDORSMENT,
      endorsment: server_resp
    }
    const endorsmentCreatedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemCreation.endorsments
    }

    fetchMock.postOnce(
      'https://api.vuedensemble.org/api/endorsments/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' },
        status: 201
      }
    )
    testFetchActions(
      postEndorsment,
      [endorsment],
      [addEndorsmentAction, endorsmentCreatedNotif],
      mockStore(initStore)
    )
  })

  it('deleteEndorsment', () => {
    const endorsmentId = 18
    const deleteEndorsmentAction = {
      type: cst.actions.DELETE_ENDORSMENT,
      id: endorsmentId
    }
    const endorsmentDeletedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemDeletion.endorsments
    }
    fetchMock.deleteOnce('https://api.vuedensemble.org/api/endorsments/18/', { status: 204 })
    testFetchActions(
      deleteEndorsment,
      [endorsmentId],
      [deleteEndorsmentAction, endorsmentDeletedNotif],
      mockStore(initStore)
    )
  })

  it('getUser', () => {
    const userId = 1
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_user_1.json")
    testDispatchActions(
      getUser,
      [userId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('patchUser', () => {
    const usr = {
      id: 1,
      bio: "Fondateur du projet VDE, j'aimerai faire ma part pour faire progresser la démocratie.",
      image: "http://localhost:8000/media/profile_images/vde3.png"
    }
    const server_resp = require("../../cypress/fixtures/api/post/user_1.json")
    const addUserAction = {
      type: cst.actions.ADD_USER,
      user: server_resp
    }
    const userPatchedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemModification.users
    }
    fetchMock.patchOnce(
      'https://api.vuedensemble.org/api/users/1/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' }
      }
    )
    testFetchActions(
      patchUser,
      [usr],
      [addUserAction, userPatchedNotif],
      mockStore(initStore)
    )
  })

  it('getSubscriptions', () => {
    const page = 1
    const options = { favorites: false, author: 1 }
    const requestId = "9171d8be-5724-4a32-9c2a-f00957178169"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/get_subscriptions.json")
    testDispatchActions(
      getSubscriptions,
      [page, options, requestId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('unfollow', () => {
    uuid.mockImplementation(() => '1c396dda-1e3a-4851-9ce0-9c7e6f9050b0')
    const userId = "17"
    const addRequestAction = require("../../cypress/fixtures/actions/add_request/unfollow.json")
    testDispatchActions(
      unfollow,
      [userId],
      [addRequestAction],
      mockStore(initStore)
    )
  })

  it('follow', () => {
    const author = 1
    const target_id = 17
    const server_resp = require("../../cypress/fixtures/api/post/subscription.json")
    const addSubscriptionAction = {
      type: cst.actions.CREATE_SUBSCRIPTION,
      subscription: server_resp
    }
    const subscriptionCreatedNotif = {
      type: cst.actions.ADD_NOTIFICATION,
      notif: cst.notifications.itemCreation.subscriptions
    }

    fetchMock.postOnce(
      'https://api.vuedensemble.org/api/subscriptions/',
      {
        body: server_resp,
        headers: { 'content-type': 'application/json' },
        status: 201
      }
    )
    testFetchActions(
      follow,
      [author, target_id],
      [addSubscriptionAction, subscriptionCreatedNotif],
      mockStore(initStore)
    )
  })
})
