import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const postVote = (vote) => {
  return (dispatch) => {
    api.sendItem(dispatch, vote, "ratings", basics.addRating, "/", "POST")
  }
}

export const deleteVote = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "ratings")
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, `/${bigPicture.id}/`, "PATCH")
  }
}

export const getUser = (id) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "users", [])
  }
}

export const getSubjects = (page) => {
  return (dispatch) => {
    const next = "getallsubjects"
    const nextargs = {}
    api.getCollection(dispatch, "subjects", page, [], next, nextargs)
  }
}

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", page, [`element=${bigpictureId}`])
  }
}

export const getBigPicture = (bpId) => {
  return (dispatch) => {
    api.getItem(dispatch, bpId, "bigpictures", [])
  }
}

export const getBigPictureRatings = (page, targetId, userId) => {
  return (dispatch) => {
    const next = "getbigpictureratings"
    const nextargs = { targetId }
    api.getCollection(dispatch, "ratings", page, [`bigpicture=${targetId}`], next, nextargs)
  }
}

export const getOwnSubjects = (userId, page) => {
  return (dispatch) => {
    const next = "getownsubjects"
    const nextargs = { userId }
    api.getCollection(dispatch, "subjects", page, [`author=${userId}`], next, nextargs)
  }
}

export const getRatedSubjects = (userId, page) => {
  return (dispatch) => {
    const next = "getratedsubjects"
    const nextargs = { userId }
    api.getCollection(dispatch, "subjects", page, [`ratingauthor=${userId}`], next, nextargs)
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures")
  }
}
