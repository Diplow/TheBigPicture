/**
 * This action is triggered when processing requests.
 * Basically it adds items to the store by dispatching actions based
 * on the server response to the request. The reason it is done here,
 * and not in a premise right after the request is answered,
 * is because of a specific request handling design /reducers/requests.js
 **/

import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"


export const add = (request) => {

  return (dispatch) => {
    if (request.id.split('-').indexOf("results") == -1) {
      const itemAPI = request.url.split("/")[0]
      const actions = {
        "bigpictures": addBigPicture,
        "subjects": addBigPicture,
        "ownsubjects": addBigPicture,
        "subscriptions": (request, dispatch, subscription) => {
          dispatch(basics.addUser(subscription.target))
          dispatch(basics.addSubscription(subscription))
        },
        "ownratings": (request, dispatch, rating) => { dispatch(basics.addRating(rating)) },
        "users": (request, dispatch, user) => { dispatch(basics.addUser(user)) },
        "ratings": (request, dispatch, rating) => { dispatch(basics.addRating(rating)) },
      }

      const addAction = actions[itemAPI]

      if (addAction == undefined)
        throw Error("unknown itemAPI " + itemAPI)

      if (request.response.results != undefined
        && request.response.count != undefined) {
          handleCollection(request, dispatch, addAction)
      }
      else {
        addAction(request, dispatch, request.response)
      }
    }

    dispatch(basics.processed(request))
  }
}

const addBigPicture = (request, dispatch, bigPicture) => {
  if (bigPicture.family != null) {
    for (let i = 0; i < bigPicture.family.length; ++i) {
      const child = bigPicture.family[i]
      if (child.id !== undefined) {
        addBigPicture(request, dispatch, { ...child, favorite: request.nextargs.favorites })
      }
    }
  }
  if (bigPicture.author.id != undefined)
    dispatch(basics.addUser({ ...bigPicture.author, favorite: request.nextargs.favorites }))
  dispatch(basics.addBigPicture({ ...bigPicture, favorite: request.nextargs.favorites }))
}

const handleCollection = (request, dispatch, addAction) => {
  const results = request.response.results
  for (let i = 0; i < results.length; ++i) {
    addAction(request, dispatch, {
      ...results[i],
      [request.requestId]: i + 10 * request.nextargs.page,
      requestId: request.requestId,
    })
  }
}