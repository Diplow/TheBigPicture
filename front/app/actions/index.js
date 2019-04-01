import * as basics from "./basics"
import * as api from './api'
import * as cst from "../constants"


export const postBigPicture = (bigPicture) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(basics.deactivateModal(cst.CREATE_BIG_PICTURE_MODAL))
    }
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/", "POST", next)
  }
}

export const postArgument = (argument) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(getBigPicture(res.resourceFor))
      dispatch(basics.deactivateModal(cst.CREATE_ARGUMENT_MODAL))
    }
    api.sendItem(dispatch, argument, "arguments", basics.addArgument, "/", "POST", next)
  }
}

export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(basics.deactivateModal(cst.CREATE_BIG_PICTURE_MODAL))
    }
    api.sendItem(dispatch, bigPicture, "bigpictures", basics.addBigPicture, "/" + bigPicture.id + "/", "PATCH", next)
  }
}

export const postResource = (resource) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(getBigPicture(res.resourceFor))
      dispatch(basics.deactivateModal(cst.CREATE_RESOURCE_MODAL))
    }
    // the API is the same for resources and bigpictures since it is the same kind of object
    api.sendItem(dispatch, resource, "bigpictures", basics.addResource, "/?format=json", "POST", next)
  }
}

export const getBigPictures = () => {
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", basics.addBigPicture, "/?format=json&element=root")
  }
}

export const getArguments = (bigpictureId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "arguments", basics.addArgument, "/?element=" + bigpictureId)
  }
}

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    api.getCollection(dispatch, "bigpictures", basics.addResource, "/?element=" + bigpictureId)
  }
}

export const getBigPicture = (id, next) => {
  return (dispatch) => {
    api.getItem(dispatch, id, "bigpictures", basics.addBigPicture, next)
  }
}

export const setBigPicture = (id) => {
  return (dispatch) => {
    dispatch(getBigPicture(id, (item) => { dispatch(basics.selectBigPicture(item.id)) }))
    dispatch(getArguments(id))
    dispatch(getResources(id))
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures", basics.removeBigPicture)
  }
}

export const deleteArgument = (id) => {
  console.log("deleteArgument", id)
  return (dispatch) => {
    api.deleteItem(dispatch, id, "arguments", basics.removeArgument)
  }
}

export const deleteResource = (id) => {
  return (dispatch) => {
    api.deleteItem(dispatch, id, "bigpictures", basics.removeResource)
  }
}
