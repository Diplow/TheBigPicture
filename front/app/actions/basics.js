import * as cst from "../constants"


export const login = (user, token) => {
  return {
    type: cst.LOGIN,
    user,
    token
  }
}

export const logout = () => {
  return {
    type: cst.LOGOUT
  }
}


export const make = (request) => {
  return {
    type: cst.ADD_REQUEST,
    request
  }
}

export const ongoing = (request) => {
  return {
    type: cst.REQUEST_ONGOING,
    request
  }
}

export const done = (request) => {
  return {
    request,
    type: cst.REQUEST_DONE
  }
}

export const processed = (request) => {
  return {
    request,
    type: cst.REQUEST_PROCESSED
  }
}

export const notification = (notif) => {
  return {
    type: cst.ADD_NOTIFICATION,
    notif
  }
}

export const popNotification = (id) => {
  return {
    type: cst.POP_NOTIFICATION,
    id
  }
}

export const setSubjectCount = (count, requestId) => {
  return {
    type: cst.SET_GLOBAL_SUBJECT_COUNT,
    count,
    requestId
  }
}

export const setBpReferenceCount = (count, bpId, requestId) => {
  return {
    type: cst.SET_BP_REFERENCE_COUNT,
    count,
    bpId,
    requestId
  }
}

export const setSubscriptionCount = (count, requestId) => {
  return {
    type: cst.SET_SUBSCRIPTION_COUNT,
    count,
    requestId
  }
}

export const setOwnSubjectCount = (userId, count, requestId) => {
  return {
    type: cst.SET_OWN_SUBJECT_COUNT,
    count,
    userId,
    requestId
  }
}

export const setOwnRatingCount = (userId, count, requestId) => {
  return {
    type: cst.SET_OWN_RATING_COUNT,
    count,
    userId,
    requestId
  }
}

export const setBpRatingCount = (bpId, count, requestId) => {
  return {
    type: cst.SET_BP_RATING_COUNT,
    count,
    bpId,
    requestId
  }
}

export const setRatingRatingCount = (ratingId, count, requestId) => {
  return {
    type: cst.SET_RATING_RATING_COUNT,
    count,
    ratingId,
    requestId
  }
}

export const setEndorsmentCount = (ratingId, count, requestId) => {
  return {
    type: cst.SET_ENDORSMENT_COUNT,
    count,
    ratingId,
    requestId
  }
}

export const setBpEndorsmentCount = (bpId, count, requestId) => {
  return {
    type: cst.SET_BP_ENDORSMENT_COUNT,
    count,
    bpId,
    requestId
  }
}

export const addBigPicture = (bigpicture) => {
  return {
    type: cst.ADD_BIG_PICTURE,
    bigpicture
  }
}


// note that bpId is called "reference" in the querystring of
// the server request. It makes sense when you are server side
// and you understand "reference" as "who is referring to this bp"
// but here "reference" represents something else: the result of this request.
export const addBigPictureReference = (bpId, referenceId) => {
  return {
    type: cst.ADD_BIG_PICTURE_REFERENCE,
    bpId,
    referenceId
  }
}

export const addBigPictureResults = (bpId, results) => {
  return {
    type: cst.ADD_BIG_PICTURE_RESULTS,
    bpId,
    results
  }
}

export const addUser = (user) => {
  return {
    type: cst.ADD_USER,
    user
  }
}

export const addRating = (rating) => {
  return {
    type: cst.ADD_RATING,
    rating
  }
}

export const addSubscription = (subscription) => {
  return {
    type: cst.ADD_SUBSCRIPTION,
    subscription
  }
}

export const addEndorsment = (endorsment) => {
  return {
    type: cst.ADD_ENDORSMENT,
    endorsment
  }
}

export const addRatingResults = (ratingId, results) => {
  return {
    type: cst.ADD_RATING_RESULTS,
    ratingId,
    results
  }
}

export const removeBigPicture = (id) => {
  return {
    type: cst.DELETE_BIG_PICTURE,
    id
  }
}

export const removeRating = (id) => {
  return {
    type: cst.DELETE_RATING,
    id
  }
}

export const removeSubscription = (id) => {
  return {
    type: cst.DELETE_SUBSCRIPTION,
    id
  }
}

export const removeEndorsment = (id) => {
  return {
    type: cst.DELETE_ENDORSMENT,
    id
  }
}
