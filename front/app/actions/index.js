import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const postVote = (bpId, rating) => {
  return (dispatch) => {
    const vote = {
      target: bpId,
      value: rating
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

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", basics.addBigPicture, "/?element=" + bigpictureId)
  }
}

export const getBigPicture = (id, next) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "bigpictures", basics.addBigPicture, next)
    dispatch(getResources(id))
  }
}

export const setBigPicture = (id) => {
  return (dispatch) => {
    dispatch(getBigPicture(id))
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures", basics.removeBigPicture)
  }
}
