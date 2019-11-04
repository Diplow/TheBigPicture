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

export const done = (request) => {
  return {
    ...request,
    type: cst.REQUEST_DONE
  }
}

export const processed = (request) => {
  return {
    ...request,
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

export const setRatedSubjectCount = (userId, count) => {
  return {
    type: cst.SET_RATED_SUBJECT_COUNT,
    userId,
    count
  }
}

export const setOwnSubjectCount = (userId, count) => {
  return {
    type: cst.SET_OWN_SUBJECT_COUNT,
    userId,
    count
  }
}

export const setSubjectCount = (count) => {
  return {
    type: cst.SET_GLOBAL_SUBJECT_COUNT,
    count
  }
}

export const addBigPicture = (bigpicture) => {
  return {
    type: cst.ADD_BIG_PICTURE,
    bigpicture
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

export const removeBigPicture = (id) => {
  return {
    type: cst.DELETE_BIG_PICTURE,
    id
  }
}
