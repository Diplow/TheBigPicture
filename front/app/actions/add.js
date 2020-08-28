/**
 * This action is triggered when processing requests.
 * Basically it adds items to the store by dispatching actions based
 * on the server response to the request. The reason it is done here,
 * and not in a premise right after the request is answered,
 * is because of a specific request handling design front/app/reducers/requests.js
 **/

import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"


const addBigPicture = (request, dispatch, bigPicture) => {
  // When adding a new bigPicture, a favorite field is added depending on the request
  // Specifically if the querystring includes "favorites=true", the server will only
  // return elements to which the user is subscribed.
  // see front/app/components/List/pagination.js:SearchBar
  const favorite = request.nextargs !== undefined && request.nextargs.favorites
  dispatch(basics.addBigPicture({ ...bigPicture, favorite }))
}

const addCollection = (request, dispatch, addAction) => {
  const results = request.response.results
  for (let i = 0; i < results.length; ++i) {
    addAction(request, dispatch, {
      ...results[i],
      // requestIds are used to remember a server ranking that can not
      // be reproduced here (e.g full text search)
      // A unique requestId is used for different pages.
      // ranks are adjusted according to the pagination.
      // fifth result from the first page is supposed to be more fitting
      // than the first result from the second page.
      [request.requestId]: i + cst.PAGE_SIZE * request.nextargs.page,
      requestId: request.requestId,
    })
  }
}

// Action are based on the REST ressource type identified from the API call
const ADD_ACTIONS = {
  "bigpictures": addBigPicture,
  "subjects": addBigPicture,
  "ownsubjects": addBigPicture,
  "categories": (request, dispatch, category) => { dispatch(basics.addCategory(category)) },
  "subscriptions": (request, dispatch, subscription) => { dispatch(basics.addSubscription(subscription)) },
  "endorsments": (request, dispatch, endorsment) => { dispatch(basics.addEndorsment(endorsment)) },
  "ownratings": (request, dispatch, rating) => {dispatch(basics.addRating(rating)) },
  "ratingswithcontext": (request, dispatch, rating) => {dispatch(basics.addRating(rating)) },
  "users": (request, dispatch, user) => { dispatch(basics.addUser(user)) },
  "ratings": (request, dispatch, rating) => { dispatch(basics.addRating(rating)) },
}

export const add = (request) => (
  (dispatch) => {
    // Action are based on the REST ressource type identified from the API call
    const itemAPI = request.url.split("/")[0]
    const addAction = ADD_ACTIONS[itemAPI]

    if (addAction == undefined) throw Error(`unknown itemAPI ${itemAPI}`)

    const isCollection = request.response.results != undefined && request.response.count != undefined
    isCollection
      ? addCollection(request, dispatch, addAction)
      : addAction(request, dispatch, request.response)
  }
)
