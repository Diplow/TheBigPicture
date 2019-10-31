import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const postVote = (bpId, rating, author, subject) => {
  return (dispatch) => {
    const vote = {
      author,
      subject,
      target: bpId,
      value: rating
    }
    api.sendItem(dispatch, vote, "ratings", basics.addRating, "/", "POST")
  }
}

export const addBigPicture = (bigPicture) => {
  return (dispatch) => {
    for (let i = 0; i < bigPicture.ratings.length; ++i) {
      const rating = bigPicture.ratings[i]
      dispatch(basics.addRating(rating))
    }
    dispatch(basics.addBigPicture(bigPicture))
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", addBigPicture, "/" + bigPicture.id + "/", "PATCH")
  }
}

export const getUser = (id) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "users", [])
  }
}

export const getSubjects = () => {
  return (dispatch) => {
    api.getCollection(dispatch, "subjects", [])
  }
}

export const getResources = (bigpictureId, userId) => {
  const userparam = userId != null ? ["user=" + userId] : []
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", ["element=" + bigpictureId].concat(userparam))
  }
}

export const getBigPicture = (bpId, userId) => {
  return (dispatch) => {
    api.getItem(dispatch, bpId, "bigpictures", ["ratingauthor=" + userId])
  }
}

export const getOwnSubjects = (userId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "subjects", ["author=" + userId])
  }
}

export const getRatedSubjects = (userId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "ratings", ["ratingauthor=" + userId])
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures")
  }
}
