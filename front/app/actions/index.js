import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    Object.keys(bigPicture).forEach((key) => (bigPicture[key] === null || bigPicture[key] === "") && delete bigPicture[key])
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

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

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    Object.keys(bigPicture).forEach((key) => (bigPicture[key] == null || bigPicture[key] == "") && delete bigPicture[key])
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, `/${bigPicture.id}/`, "PATCH")
  }
}

export const getUser = (id) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "users", [])
  }
}

export const getSubjects = (page, userId) => {
  return (dispatch) => {
    const next = "getallsubjects"
    const nextargs = {}
    let args = []
    if (userId != undefined)
      args = [`author=${userId}`]
    api.getCollection(dispatch, "subjects", page, args, next, nextargs)
  }
}

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", page, [`element=${bigpictureId}`])
  }
}

export const getBigPictureResults = (bigpictureId) => {
  return (dispatch) => {
    const next = "getbpresults"
    const nextargs = { bigpictureId }
    api.get(dispatch, `bigpictures/${bigpictureId}/results`, [], next, nextargs)
  }
}

export const getRatingResults = (ratingId) => {
  return (dispatch) => {
    const next = "getratingresults"
    const nextargs = { ratingId }
    api.get(dispatch, `ratings/${ratingId}/results`, [], next, nextargs)
  }
}

export const getBigPicture = (bpId) => {
  return (dispatch) => {
    api.getItem(dispatch, bpId, "bigpictures", [])
  }
}

export const getReferences = (page, bpId) => {
  return (dispatch) => {
    const next = "getreferences"
    const nextargs = { bpId }
    api.getCollection(dispatch, "subjects", page, [`reference=${bpId}`], next, nextargs)
  }
}

export const getBigPictureRatings = (page, targetId, userId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ratings", page, [`bigpicture=${targetId}`])
  }
}

export const getRatingRatings = (page, targetId, userId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ratings", page, [`rating=${targetId}`])
  }
}

export const getOwnSubjects = (page) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ownsubjects", page, [])
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
