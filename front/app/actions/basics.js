import * as cst from "../constants"


export const activateModal = (modal, bigPicture) => {
  return {
    type: cst.ACTIVATE_MODAL,
    modal,
    bigPicture
  }
}

export const deactivateModal = (modal) => {
  return {
    type: cst.DEACTIVATE_MODAL,
    modal
  }
}


export const unselectBigPicture = () => {
  return {
    type: cst.UNSELECT_BIG_PICTURE
  }
}

export const selectBigPicture = (id) => {
  return {
    type: cst.SELECT_BIG_PICTURE,
    id
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

export const addArgument = (argument) => {
  return {
    type: cst.ADD_ARGUMENT,
    bigpicture: argument
  }
}

export const addResource = (resource) => {
  return {
    type: cst.ADD_RESOURCE,
    bigpicture: resource
  }
}

export const removeBigPicture = (id) => {
  return {
    type: cst.DELETE_BIG_PICTURE,
    id
  }
}

export const removeArgument = (id) => {
  console.log("remove", id)
  return {
    type: cst.DELETE_ARGUMENT,
    id
  }
}

export const removeResource = (id) => {
  return {
    type: cst.DELETE_RESOURCE,
    id
  }
}
