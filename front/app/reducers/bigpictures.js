
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_RATING:
      const rating = action.rating
      const ratedbp = state.find(element => element.id == rating.target)
      return [
        ...state.filter(element => element.id != rating.target),
        {
          ...ratedbp,
          results: {
            ...(ratedbp.results),
            [rating.author]: rating.value
          }
        }
      ]

    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          kind: bp.kind,
          body: bp.body,
          parent: bp.parent,
          author: bp.author,
          results: bp.results,
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
