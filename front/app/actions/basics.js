import * as cst from "../constants"


export const login = (user, token) => {
  return {
    type: cst.actions.LOGIN,
    user,
    token
  }
}

export const logout = () => {
  return {
    type: cst.actions.LOGOUT
  }
}


export const make = (request) => {
  return {
    type: cst.actions.ADD_REQUEST,
    request
  }
}

export const ongoing = (request) => {
  return {
    type: cst.actions.REQUEST_ONGOING,
    request
  }
}

export const done = (request) => {
  return {
    request,
    type: cst.actions.REQUEST_DONE
  }
}

export const processed = (request) => {
  return {
    request,
    type: cst.actions.REQUEST_PROCESSED
  }
}

export const notification = (notif) => {
  return {
    type: cst.actions.ADD_NOTIFICATION,
    notif
  }
}

export const popNotification = (id) => {
  return {
    type: cst.actions.POP_NOTIFICATION,
    id
  }
}

export const setSubjectCount = (count, requestId) => {
  return {
    type: cst.actions.SET_GLOBAL_SUBJECT_COUNT,
    count,
    requestId
  }
}

export const setBpReferenceCount = (count, bpId, requestId) => {
  return {
    type: cst.actions.SET_BP_REFERENCE_COUNT,
    count,
    bpId,
    requestId
  }
}

export const setSubscriptionCount = (count, requestId) => {
  return {
    type: cst.actions.SET_OWN_SUBSCRIPTION_COUNT,
    count,
    requestId
  }
}

export const setOwnSubjectCount = (userId, count, requestId) => {
  return {
    type: cst.actions.SET_OWN_SUBJECT_COUNT,
    count,
    userId,
    requestId
  }
}

export const setOwnRatingCount = (userId, count, requestId) => {
  return {
    type: cst.actions.SET_OWN_RATING_COUNT,
    count,
    userId,
    requestId
  }
}

export const setBpRatingCount = (bpId, count, requestId) => {
  return {
    type: cst.actions.SET_BP_RATING_COUNT,
    count,
    bpId,
    requestId
  }
}

export const setRatingRatingCount = (ratingId, count, requestId) => {
  return {
    type: cst.actions.SET_RATING_RATING_COUNT,
    count,
    ratingId,
    requestId
  }
}

export const setUserRatingCount = (userId, count, requestId) => {
  return {
    type: cst.actions.SET_USER_RATING_COUNT,
    count,
    userId,
    requestId
  }
}

export const setEndorsmentCount = (ratingId, count, requestId) => {
  return {
    type: cst.actions.SET_ENDORSMENT_COUNT,
    count,
    ratingId,
    requestId
  }
}

export const setBpEndorsmentCount = (bpId, count, requestId) => {
  return {
    type: cst.actions.SET_BP_ENDORSMENT_COUNT,
    count,
    bpId,
    requestId
  }
}

export const setUserEndorsmentCount = (userId, count, requestId) => {
  return {
    type: cst.actions.SET_USER_ENDORSMENT_COUNT,
    count,
    userId,
    requestId
  }
}

export const addBigPicture = (bigpicture) => {
  return {
    type: cst.actions.ADD_BIG_PICTURE,
    bigpicture
  }
}


// note that bpId is called "reference" in the querystring of
// the server request. It makes sense when you are server side
// and you understand "reference" as "who is referring to this bp"
// but here "reference" represents something else: the result of this request.
export const addBigPictureReference = (bpId, referenceId) => {
  return {
    type: cst.actions.ADD_BIG_PICTURE_REFERENCE,
    bpId,
    referenceId
  }
}

export const addGivenReason = (userId, ratingId) => {
  return {
    type: cst.actions.ADD_GIVEN_REASON,
    userId,
    ratingId
  }
}

export const addBigPictureResults = (bpId, results) => {
  return {
    type: cst.actions.ADD_BIG_PICTURE_RESULTS,
    bpId,
    results
  }
}

export const addUser = (user) => {
  return {
    type: cst.actions.ADD_USER,
    user
  }
}

export const addRating = (rating) => {
  return {
    type: cst.actions.ADD_RATING,
    rating
  }
}

export const addSubscription = (subscription) => {
  return {
    type: cst.actions.ADD_SUBSCRIPTION,
    subscription
  }
}

export const createSubscription = (subscription) => {
  return {
    type: cst.actions.CREATE_SUBSCRIPTION,
    subscription
  }
}

export const addEndorsment = (endorsment) => {
  return {
    type: cst.actions.ADD_ENDORSMENT,
    endorsment
  }
}

export const addRatingResults = (ratingId, results) => {
  return {
    type: cst.actions.ADD_RATING_RESULTS,
    ratingId,
    results
  }
}

export const removeBigPicture = (id) => {
  return {
    type: cst.actions.DELETE_BIG_PICTURE,
    id
  }
}

export const removeRating = (id) => {
  return {
    type: cst.actions.DELETE_RATING,
    id
  }
}

export const removeSubscription = (targetId) => {
  return {
    type: cst.actions.DELETE_SUBSCRIPTION,
    targetId
  }
}

export const removeEndorsment = (id) => {
  return {
    type: cst.actions.DELETE_ENDORSMENT,
    id
  }
}
