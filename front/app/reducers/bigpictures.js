
import * as cst from "../constants"

const getBigPictureDetails = (bigPicture) => {
  let res = null
  switch (bigPicture.kind) {

    case cst.ARGUMENT_CODE:
      res = {
        nature: bigPicture.nature,
      }
      break

    case cst.VOTATION_CODE:
      res = {
        choices: bigPicture.choices,
        results: bigPicture.results,
        deadline: bigPicture.deadline
      }
      break

    default:
      res = {}
  }

  // remove key of undefined properties
  // this way, adding an already set bigpicture works correctly
  Object.keys(res).forEach(key => res[key] === undefined && delete res[key])
  return res
}

const bigpictures = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture
      const details = getBigPictureDetails(bp)
      const previous_bp = state.find(element => element.id == bp.id)
      return [
        ...state.filter(element => element.id != bp.id),
        {
          // don't override completely previous bp
          // for instance if an argument is added
          // and then is added as a bigpicture
          // without the 'nature' property
          // keep the previous value for the nature property
          ...previous_bp,
          ...details,
          id: bp.id,
          title: bp.title,
          kind: bp.kind,
          body: bp.body,
          resourceFor: bp.resourceFor,
          author: bp.author,
          creationDate: bp.creationDate
        }
      ]

    case cst.UPDATE_BIG_PICTURE:
      const new_bp = action.bigpicture;
      const old_bp = state.find(element => element.id == bp.id)
      return [
        ...state.filter(element => element.id != bp.id),
        {
          ...old_bp,
          ...new_bp
        }
      ]

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
