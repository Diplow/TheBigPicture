
import {
  ADD_BIG_PICTURE,
  ADD_ARGUMENT,
  ADD_RESOURCE,
  DELETE_BIG_PICTURE,
  DELETE_ARGUMENT,
  DELETE_RESOURCE } from "../constants"

const bigpictures = (state = [], action) => {
  switch (action.type) {
    case ADD_RESOURCE:
    case ADD_ARGUMENT:
    case ADD_BIG_PICTURE:
      const bp = action.bigpicture;
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          body: bp.body,
          img: bp.img,
          hashtags: bp.hashtags,
          resources: bp.resources,
          isResource: bp.isResource != undefined ? bp.isResource : []
        }
      ]
    case DELETE_RESOURCE:
    case DELETE_ARGUMENT:
    case DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)
    default:
      return state
  }
}

export default bigpictures