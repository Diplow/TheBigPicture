import * as cst from "../constants"


export const login = (user, token) => ({
  type: cst.actions.LOGIN,
  user,
  token
})

export const logout = () => ({
  type: cst.actions.LOGOUT
})

export const make = (request) => ({
  type: cst.actions.ADD_REQUEST,
  request
})

export const ongoing = (request) => ({
  type: cst.actions.REQUEST_ONGOING,
  request
})

export const done = (request) => ({
  request,
  type: cst.actions.REQUEST_DONE
})

export const processed = (request) => ({
  request,
  type: cst.actions.REQUEST_PROCESSED
})

export const notification = (notif) => ({
  type: cst.actions.ADD_NOTIFICATION,
  notif
})

export const popNotification = (id) => ({
  type: cst.actions.POP_NOTIFICATION,
  id
})

export const setSubjectCount = (count, requestId) => ({
  type: cst.actions.SET_GLOBAL_SUBJECT_COUNT,
  count,
  requestId
})

export const setSubjectRatingCount = (subject, count, requestId) => ({
  type: cst.actions.SET_SUBJECT_RATING_COUNT,
  count,
  subject,
  requestId
})

export const setBpReferenceCount = (count, bpId, requestId) => ({
  type: cst.actions.SET_BP_REFERENCE_COUNT,
  count,
  bpId,
  requestId
})

export const setSubscriptionCount = (count, requestId) => ({
  type: cst.actions.SET_OWN_SUBSCRIPTION_COUNT,
  count,
  requestId
})

export const setCategoryCount = (count, requestId) => ({
  type: cst.actions.SET_GLOBAL_CATEGORY_COUNT,
  count
})

export const setSubjectCategoryCount = (category, count, requestId) => ({
  type: cst.actions.SET_CATEGORY_SUBJECT_COUNT,
  count,
  category
})

export const setOwnSubjectCount = (userId, count, requestId) => ({
  type: cst.actions.SET_OWN_SUBJECT_COUNT,
  count,
  userId,
  requestId
})

export const setOwnRatingCount = (userId, count, requestId) => ({
  type: cst.actions.SET_OWN_RATING_COUNT,
  count,
  userId,
  requestId
})

export const setBpRatingCount = (bpId, count, requestId) => ({
  type: cst.actions.SET_BP_RATING_COUNT,
  count,
  bpId,
  requestId
})

export const setRatingRatingCount = (ratingId, count, requestId) => ({
  type: cst.actions.SET_RATING_RATING_COUNT,
  count,
  ratingId,
  requestId
})

export const setUserRatingCount = (userId, count, requestId) => ({
  type: cst.actions.SET_USER_RATING_COUNT,
  count,
  userId,
  requestId
})

export const setEndorsmentCount = (ratingId, count, requestId) => ({
  type: cst.actions.SET_ENDORSMENT_COUNT,
  count,
  ratingId,
  requestId
})

export const setBpEndorsmentCount = (bpId, count, requestId) => ({
  type: cst.actions.SET_BP_ENDORSMENT_COUNT,
  count,
  bpId,
  requestId
})

export const setUserEndorsmentCount = (userId, count, requestId) => ({
  type: cst.actions.SET_USER_ENDORSMENT_COUNT,
  count,
  userId,
  requestId
})

export const addBigPicture = (bigpicture) => ({
  type: cst.actions.ADD_BIG_PICTURE,
  bigpicture
})

export const createBigPicture = (bigpicture) => ({
  type: cst.actions.CREATE_BIG_PICTURE,
  bigpicture
})

// note that bpId is called "reference" in the querystring of
// the server request. It makes sense when you are server side
// and you understand "reference" as "who is referring to this bp"
// but here "reference" represents something else: the result of this request.
export const addBigPictureReference = (bpId, referenceId) => ({
  type: cst.actions.ADD_BIG_PICTURE_REFERENCE,
  bpId,
  referenceId
})

export const addGivenReason = (userId, ratingId) => ({
  type: cst.actions.ADD_GIVEN_REASON,
  userId,
  ratingId
})

export const addBigPictureResults = (bpId, results) => ({
  type: cst.actions.ADD_BIG_PICTURE_RESULTS,
  bpId,
  results
})

export const addUser = (user) => ({
  type: cst.actions.ADD_USER,
  user
})

export const addCategory = (category) => ({
  type: cst.actions.ADD_CATEGORY,
  category
})

export const addRating = (rating) => ({
  type: cst.actions.ADD_RATING,
  rating
})

export const createRating = (rating) => ({
  type: cst.actions.CREATE_RATING,
  rating
})

export const addSubscription = (subscription) => ({
  type: cst.actions.ADD_SUBSCRIPTION,
  subscription
})

export const createSubscription = (subscription) => ({
  type: cst.actions.CREATE_SUBSCRIPTION,
  subscription
})

export const addEndorsment = (endorsment) => ({
  type: cst.actions.ADD_ENDORSMENT,
  endorsment
})

export const addRatingResults = (ratingId, results) => ({
  type: cst.actions.ADD_RATING_RESULTS,
  ratingId,
  results
})

export const removeBigPicture = (id) => ({
  type: cst.actions.DELETE_BIG_PICTURE,
  id
})

export const removeRating = (id) => ({
  type: cst.actions.DELETE_RATING,
  id
})

export const removeSubscription = (targetId) => ({
  type: cst.actions.DELETE_SUBSCRIPTION,
  targetId
})

export const removeEndorsment = (id) => ({
  type: cst.actions.DELETE_ENDORSMENT,
  id
})
