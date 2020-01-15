
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_BIG_PICTURE_REFERENCE:
      let old = state.find(element => element.id == action.bpId)
      return [
        ...state.filter(element => element.id != old.id),
        {
          ...old,
          references: [...old.references.filter(ref => ref != action.referenceId), action.referenceId]
        }
      ]

    case cst.ADD_BIG_PICTURE_RESULTS:
      old = state.find(element => element.id == action.bpId)
      return [
        ...state.filter(element => element.id != old.id),
        {
          ...old,
          results: action.results
        }
      ]

    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture
      old = state.find(element => element.id == bp.id)
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          kind: bp.kind,
          body: bp.body,
          children: bp.children,
          family: bp.family != null ? bp.family.map(child => child.id) : undefined,
          hyperlink: bp.hyperlink,
          hyperlink_id: bp.hyperlink_id,
          parent: bp.parent,
          subject: bp.subject,
          author: bp.author_id,
          creation_date: bp.creation_date,
          modification_date: bp.modification_date,
          ratingCount: bp.ratingCount,
          referenceCount: bp.referenceCount,
          references: old == null ? [] : old.references,
        }
      ]

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
