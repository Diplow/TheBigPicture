import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const postVote = (bpId, rating, author) => {
  return (dispatch) => {
    const vote = {
      target: bpId,
      value: rating,
      author: author
    }
    api.sendItem(dispatch, vote, "ratings", basics.addRating, "/", "POST")
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/" + bigPicture.id + "/", "PATCH")
  }
}

export const getSubjects = () => {
  return (dispatch) => {
    api.getCollection(dispatch, "subjects", basics.addBigPicture, "/?format=json")
  }
}

export const getResources = (bigpictureId, userId) => {
  const userparam = userId != null ? "&user=" + userId : ""
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", basics.addBigPicture, "/?element=" + bigpictureId + userparam)
  }
}

export const getBigPicture = (bpId, userId, next) => {
  return (dispatch) => {
    api.getItem(dispatch, bpId, "bigpictures", basics.addBigPicture, next)
    dispatch(getResources(bpId, userId))
  }
}

export const setBigPicture = (bpId, userId) => {
  return (dispatch) => {
    dispatch(getBigPicture(bpId, userId))
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures", basics.removeBigPicture)
  }
}
