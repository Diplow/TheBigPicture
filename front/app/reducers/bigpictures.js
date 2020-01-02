
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  switch (action.type) {

    case cst.SET_BIG_PICTURE_RATING_COUNT:
      const target = state.find(element => element.id == action.targetId)
      if (target != null) {
        return [
          ...state.filter(element => element.id != target.id),
          {
            ...target,
            ratingCount: action.count
          }
        ]
      }
      return state

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
          family: bp.family != null ? bp.family.map(child => child.id) : undefined,
          subjectratings: bp.subjectratings != null ? bp.subjectratings.map(rating => rating.id) : undefined,
          parent: bp.parent,
          subject: bp.subject,
          author: bp.author_id,
          creation_date: bp.creation_date,
          modification_date: bp.modification_date,
          ratingCount: bp.ratingCount
        }
      ]

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
