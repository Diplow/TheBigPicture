
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const bigpictures = (state = [], action) => {
  let old = null
  let old_parent = null
  let new_parent = null
  let target_bp = null
  let res = null
  let bp = null

  switch (action.type) {

    case cst.ADD_BIG_PICTURE_REFERENCE:
      return reducer_utils.add_item_to_set(
        state,
        action.bpId,
        "references",
        action.referenceId
      )

    case cst.ADD_BIG_PICTURE_RESULTS:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { results: action.results }
      )

    case cst.LOGOUT:
      return state.filter(element => element.private == false)

    case cst.ADD_BIG_PICTURE:
      bp = action.bigpicture
      old = state.find(element => element.id == bp.id)
      res = [
        ...state.filter(element => element.id != bp.id),
        {
          ...old,
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
          favorite: reducer_utils.set_or_update("favorite", bp, old, false),
          references: reducer_utils.set_or_update("references", bp, old, []),
          [bp.requestId]: bp[bp.requestId],
          private: bp.private,
        }
      ]
      const parentHasChanged = old != null && old.parent != bp.parent
      if (!parentHasChanged) return res

      old_parent = state.find(element => element.id == old.parent)
      new_parent = state.find(element => element.id == bp.parent)
      return [
        ...res.filter(element => element.id != old_parent.id && element.id != new_parent.id),
        {
          ...old_parent,
          children: old_parent.children.filter(id => id != bp.id)
        },
        {
          ...new_parent,
          children: [...new_parent.children, bp.id]
        }
      ]


    case cst.SET_BP_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { ratingCount: action.count }
      )

    case cst.SET_BP_REFERENCE_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { referenceCount: action.count }
      )

    case cst.SET_BP_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { endorsmentCount: action.count })

    case cst.DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)

    default:
      return state
  }
}

export default bigpictures
