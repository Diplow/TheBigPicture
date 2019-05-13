import * as cst from "../constants"


export const updateDraft = (key, value, modal) => {
  return {
    type: cst.UPDATE_DRAFT,
    modal,
    key,
    value
  }
}

export const pushChoice = (bpId) => {
  return {
    type: cst.PUSH_CHOICE,
    bpId
  }
}

export const removeChoice = (bpId) => {
  return {
    type: cst.REMOVE_CHOICE,
    bpId
  }
}

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

export const notification = (msg) => {
  return {
    type: cst.NOTIFICATION,
    msg
  }
}

export const addBigPicture = (bigpicture) => {
  return {
    type: cst.ADD_BIG_PICTURE,
    bigpicture
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
