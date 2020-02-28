
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  let old = null
  let old_parent = null
  let new_parent = null
  let res = state

  switch (action.type) {

    case cst.ADD_BIG_PICTURE_REFERENCE:
      old = state.find(element => element.id == action.bpId)
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

    case cst.LOGOUT:
      return state.filter(element => element.private == false)

    case cst.ADD_BIG_PICTURE:
      const bp = action.bigpicture
      old = state.find(element => element.id == bp.id)
      if (old != null && old.parent != bp.parent) {
        old_parent = state.find(element => element.id == old.parent)
        new_parent = state.find(element => element.id == bp.parent)
      }
      res = [
        ...state.filter(element => element.id != bp.id
          && (old_parent == null || element.id != old_parent.id)
          && (new_parent == null || element.id != new_parent.id)),
        {
          id: bp.id,
          title: bp.title,
          kind: bp.kind,
          body: bp.body,
          children: bp.children,
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
          private: bp.private,
        }
      ]
      if (old_parent != null) {
        res.push({
          ...old_parent,
          children: old_parent.children.filter(id => id != bp.id)
        })
        res.push({
          ...new_parent,
          children: [...new_parent.children, bp.id]
        })
      }
      return res

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
