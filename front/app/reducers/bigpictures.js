
import * as cst from "../constants"

const bigpictures = (state = [], action) => {
  switch (action.type) {
    case cst.ADD_ARGUMENT:
      action.bigpicture.isArg = true
    case cst.ADD_RESOURCE:
    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture;
      const alreadyInBP = state.filter(element => element.id == bp.id)
      const current = alreadyInBP.length == 1 ? alreadyInBP[0] : null
      if (action.bigpicture.isArg == undefined && current != null)
        action.bigpicture.isArg = current.isArg
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          body: bp.body,
          img: bp.img,
          hashtags: bp.hashtags,
          resources: bp.resources,
          isResource: bp.isResource != undefined ? bp.isResource : [],
          resourceFor: bp.resourceFor,
          author: bp.author,
          isArg: action.bigpicture.isArg != undefined ? action.bigpicture.isArg : false
        }
      ]
    case cst.DELETE_RESOURCE:
    case cst.DELETE_ARGUMENT:
    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)
    default:
      return state
  }
}

export default bigpictures