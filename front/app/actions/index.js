import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


/**
 *
 * ---- BIGPICTURES ----
 * 
 **/


export const getBigPicture = (bpId) => {
  return (dispatch) => {
    api.getItem(dispatch, bpId, "bigpictures", [])
  }
}

export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, removeEmptyKeys(bigPicture), "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, removeEmptyKeys(bigPicture), "bigpictures", basics.addBigPicture, `/${bigPicture.id}/`, "PATCH")
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures")
  }
}

export const getSubjects = (page, options, requestId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "subjects", page, options, options.reference == undefined ? "getSubjects" : "getReferences", requestId)
  }
}

export const getOwnSubjects = (page, options, requestId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ownsubjects", page, options, "getOwnSubjects", requestId)
  }
}

export const getBigPictureResults = (bigpictureId) => {
  return (dispatch) => {
    api.get(dispatch, `bigpictures/${bigpictureId}/results`, { bigpictureId }, "getBigPictureResults")
  }
}


/**
 *
 * ---- RATINGS ----
 * 
 **/


export const postVote = (vote) => {
  return (dispatch) => {
    Object.keys(vote).forEach((key) => (vote[key] === null || vote[key] === "") && delete vote[key])
    api.sendItem(dispatch, vote, "ratings", basics.addRating, "/", "POST")
  }
}

export const deleteVote = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "ratings")
  }
}

export const getRatings = (page, options, requestId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ratings", page, options, "getRatings", requestId)
  }
}

export const getOwnRatings = (page, options, requestId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ownratings", page, options, "getOwnRatings", requestId)
  }
}

export const getRatingResults = (ratingId) => {
  return (dispatch) => {
    api.get(dispatch, `ratings/${ratingId}/results`, { ratingId }, "getRatingResults")
  }
}


/**
 *
 * ---- USERS ----
 * 
 **/


export const getUser = (id) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "users", [])
  }
}

export const patchUser = (user) => {
  return (dispatch) => {
    api.sendItem(dispatch, removeEmptyKeys(user), "users", basics.addUser, `/${user.id}/`, "PATCH")
  }
}


/**
 *
 * ---- SUBSCRIPTIONS ----
 * 
 **/

export const getSubscriptions = (page, options, requestId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "subscriptions", page, options, "getSubscriptions", requestId)
  }
}

export const unfollow = (subscriptionId) => {
  return (dispatch) => {
    api.deleteItem(dispatch, subscriptionId, "subscriptions")
  }
}

export const follow = (author, target_id) => {
  return (dispatch) => {
    api.sendItem(dispatch, { author, target_id }, "subscriptions", basics.addSubscription, "/", "POST")
  }
}



const removeEmptyKeys = (obj) => {
  let res = {}
  Object.keys(obj).forEach(
    (key) => {
      if ((obj[key] !== null && obj[key] !== ""))
        res[key] = obj[key]
    }
  )
  return res
}