
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const addBp = (bp, state) => {
  const old = state.find((element) => element.id == bp.id)
  let res = {
    ...old,
    id: bp.id,
    title: bp.title,
    body: bp.body,
    children: bp.children ? bp.children.map((child) => child.id) : (old && old.children || []),
    hyperlink: bp.hyperlink,
    hyperlink_id: bp.hyperlink_id,
    parent: bp.parent,
    subject: bp.subject,
    author: bp.author_id,
    reverse_author: bp.reverse_author,
    creation_date: bp.creation_date,
    modification_date: bp.modification_date,
    ratingCount: old && old.ratingCount ? old.ratingCount : (bp.ratingCount || 0),
    reasonCount: old && old.reasonCount ? old.reasonCount : (bp.reasonCount || 0),
    favorite: reducer_utils.set_or_update("favorite", bp, old, false),
    references: reducer_utils.set_or_update("references", bp, old, []),
    private: bp.private,
    tags: bp.tags,
    pin: bp.pin
  }
  if (bp.requestId)
    res[bp.requestId] = bp[bp.requestId]
  if (old && old.referenceCount)
    res.referenceCount = old.referenceCount
  if (old && old.ratingCount)
    res.ratingCount = old.ratingCount
  if (old && old.endorsmentCount)
    res.endorsmentCount = old.endorsmentCount
  return [
    ...state.filter((element) => element.id != bp.id),
    res
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
  const addChildren = (bp, state) => {
    const favorite = bp.favorite
    const childrenCount = bp.children ? bp.children.length : 0
    for (let i = 0; i < childrenCount; ++i) {
      state = addBigPicture({ ...bp.children[i], favorite }, state)
    }
    return state
  }

  state = addChildren(bp, state)
  state = addBp(bp, state)
  state = addChildToParent(bp, state)
  state = handleHyperlink(bp, state)
  state = handleParentChange(bp, state)
  return state
}

const bigpictures = (state = [], action) => {

  switch (action.type) {

    case cst.actions.CREATE_BIG_PICTURE:
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

    case cst.actions.SET_BP_REASON_COUNT:
      const old = state.find((element) => element.id == action.bpId)
      if (!old) return state
      return [
        ...state.filter((element) => element.id != action.bpId),
        {
          ...old,
          reasonCount: {
            ...old.reasonCount,
            [action.code]: action.count
          }
        }
      ]

    case cst.actions.SET_SUBJECT_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.subject,
        { ratingFamilyCount: action.count })

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

    case cst.actions.CREATE_RATING:
      const target = state.find((elt) => elt.id == action.rating.target_bp)
      if (!target) return state
      state = reducer_utils.update_item(
        state,
        action.rating.target_bp,
        { ratingCount: target.ratingCount+1 }
      )
    case cst.actions.ADD_RATING:
      if (action.rating.context && action.rating.context.subject)
        return addBigPicture(action.rating.context.subject, state)
      return state

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
        if (item.author == action.subscription.target_id) {
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
