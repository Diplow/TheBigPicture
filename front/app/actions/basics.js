import {
  ADD_ARGUMENT,
  ADD_BIG_PICTURE,
  ADD_RESOURCE,
  DELETE_ARGUMENT,
  DELETE_BIG_PICTURE,
  DELETE_RESOURCE } from "../constants"


export const addBigPicture = (bigpicture) => {
  return {
    type: ADD_BIG_PICTURE,
    bigpicture
  }
}

export const addArgument = (argument) => {
  return {
    type: ADD_ARGUMENT,
    bigpicture: argument
  }
}

export const addResource = (resource) => {
  return {
    type: ADD_RESOURCE,
    bigpicture: resource
  }
}

export const removeBigPicture = (id) => {
  return {
    type: DELETE_BIG_PICTURE,
    id
  }
}

export const removeArgument = (id) => {
  return {
    type: DELETE_ARGUMENT,
    id
  }
}

export const removeResource = (id) => {
  return {
    type: DELETE_RESOURCE,
    id
  }
}
