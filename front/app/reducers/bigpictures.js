
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          kind: bp.kind,
          body: bp.body,
          children: bp.children,
          family: bp.family,
          parent: bp.parent,
          subject: bp.subject,
          author: bp.author,
          creation_date: bp.creation_date,
          modification_date: bp.modification_date,
          author_image: bp.author_image,
          ratingauthor: bp.ratingauthor
        }
      ]

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
