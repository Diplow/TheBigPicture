
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const addBp = (bp, state) => {
  const old = state.find((element) => element.id == bp.id)
  return [
    ...state.filter((element) => element.id != bp.id),
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
}

const handleHyperlink = (bp, state) => {
  // If an hyperlink is created, add the reference accordingly
  // so it is not needed to reload the page to have the reference list
  // correctly displayed
  if (bp.hyperlink_id) {
    state = reducer_utils.add_item_to_set(
      state,
      bp.hyperlink_id,
      "references",
      bp.subject
    )
  }
  return state
}

const handleParentChange = (bp, state) => {
  const old = state.find((element) => element.id == bp.id)
  const parentHasChanged = old != null && old.parent != bp.parent
  if (!parentHasChanged) return state

  const old_parent = state.find((element) => element.id == old.parent)
  const new_parent = state.find((element) => element.id == bp.parent)
  return [
    ...state.filter((element) => element.id != old_parent.id && element.id != new_parent.id),
    {
      ...old_parent,
      children: old_parent.children.filter((id) => id != bp.id)
    },
    {
      ...new_parent,
      children: [...new_parent.children, bp.id]
    }
  ]
}

const addChildToParent = (bp, state) => {
  if (bp.parent) {
    state = reducer_utils.add_item_to_set(
      state,
      bp.parent,
      "children",
      bp.id
    )
  }
  return state
}

const addBigPicture = (bp, state) => {
  const addFamily = (bp, state) => {
    const favorite = bp.favorite
    if (bp.family) {
      for (let i = 0; i < bp.family.length; ++i) {
        state = addBigPicture({ ...bp.family[i], favorite }, state)
      }
    }
    return state
  }

  state = addFamily(bp, state)
  state = addBp(bp, state)
  state = addChildToParent(bp, state)
  state = handleHyperlink(bp, state)
  state = handleParentChange(bp, state)
  return state
}

const bigpictures = (state = [], action) => {

  switch (action.type) {

    case cst.actions.ADD_BIG_PICTURE:
      return addBigPicture(action.bigpicture, state)

    case cst.actions.ADD_BIG_PICTURE_REFERENCE:
      return reducer_utils.add_item_to_set(
        state,
        action.bpId,
        "references",
        action.referenceId
      )

    case cst.actions.ADD_BIG_PICTURE_RESULTS:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { results: action.results }
      )

    case cst.actions.SET_BP_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { ratingCount: action.count }
      )

    case cst.actions.SET_BP_REFERENCE_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { referenceCount: action.count }
      )

    case cst.actions.SET_BP_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.bpId,
        { endorsmentCount: action.count }
      )

    case cst.actions.DELETE_BIG_PICTURE:
      state = state.filter((element) => element.id != action.id)
      return state.map((element) => ({
        ...element,
        children: element.children.filter((id) => id !== action.id) 
      }))

    case cst.actions.ADD_RATING:
      const addContext = (context, state) => {
        if (context && context.bigpictures) {
          for (let i = 0; i < context.bigpictures.length; ++i) {
            state = addBigPicture(context.bigpictures[i], state)
          }
        }
        return state
      }
      return addContext(action.rating.context, state)

    case cst.actions.DELETE_SUBSCRIPTION:
      // If a subscription is deleted, change the favorite field accordingly
      // so it is not needed to reload the page to have the favorite filtering
      // working as intended
      return state.map((item) => {
        if (item.author == action.targetId) {
          return { ...item, favorite: false }
        }
        return { ...item }
      })

    case cst.actions.ADD_SUBSCRIPTION:
      // If a subscription is created, change the favorite field accordingly
      // so it is not needed to reload the page to have the favorite filtering
      // working as intended
      return state.map((item) => {
        if (item.author == action.subscription.author) {
          return { ...item, favorite: true }
        }
        return { ...item }
      })

    case cst.actions.LOGOUT:
      return state.filter((element) => element.private == false)

    default:
      return state
  }
}

export default bigpictures
