import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST")
  }
}

export const postArgument = (argument) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(getBigPicture(res.resourceFor))
    }
    api.sendItem(dispatch, argument, "bigpictures", basics.addBigPicture, "/", "POST", next)
  }
}

export const postRating = (rating) => {
  return (dispatch) => {
    api.sendItem(dispatch, rating, "ratings", basics.addRating, "/", "POST")
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/" + bigPicture.id + "/", "PATCH")
  }
}

export const patchRating = (rating) => {
  return (dispatch) => {
    api.sendItem(dispatch, rating, "ratings", basics.addRating, "/" + rating.id + "/", "PATCH")
  }
}

export const postResource = (resource) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(getBigPicture(res.resourceFor))
    }
    // the API is the same for resources and bigpictures since it is the same kind of object
    api.sendItem(dispatch, resource, "bigpictures", basics.addBigPicture, "/?format=json", "POST", next)
  }
}

export const getBigPictures = (ids) => {
  return (dispatch) => {
    const idsParam = ids != undefined ? '&ids=' + JSON.stringify(ids) : ''
    api.getCollection(dispatch, "bigpictures", basics.addBigPicture, "/?format=json&element=root" + idsParam)
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
