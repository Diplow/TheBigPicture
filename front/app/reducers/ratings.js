
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const addRating = (rating, state) => {
  const old = state.find((elt) => elt.id == rating.id)
  if (rating.reason == "") return state

  return [
    ...state.filter((elt) => elt.id !== rating.id),
    {
      ...old,
      id: rating.id,
      author: rating.author.id,
      author_id: rating.author.id,
      target_bp: rating.target_bp,
      target_rating: rating.target_rating,
      body: rating.body,
      subject: rating.subject,
      basisCount: rating.basisCount,
      ratingCount: old && old.ratingCount ? old.ratingCount : rating.ratingCount,
      new: old && old.new ? true : rating.new,
      date: rating.date,
      modification_date: rating.modification_date,
      [rating.requestId]: rating[rating.requestId]
    }
  ]
}

const updateRatingCounts = (rating, state) => {
  if (!rating.target_rating) return state

  const target = state.find((elt) => elt.id == rating.target_rating)
  if (!target) return state
  return [
    ...state.filter((elt) => elt.id !== target.id),
    {
      ...target,
      ratingCount: target.ratingCount+1
    }
  ]
}

const ratings = (state = [], action) => {
  switch (action.type) {

    case cst.actions.CREATE_RATING:
      action.rating.new = true
      state = addRating(action.rating, state)
      return updateRatingCounts(action.rating, state)

    case cst.actions.ADD_RATING:
      return addRating(action.rating, state)

    case cst.actions.ADD_ENDORSMENT:
      if (action.endorsment.target.id)
        return addRating(action.endorsment.target, state)
      return state

    case cst.actions.SET_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { endorsmentCount: action.count }
      )

    case cst.actions.ADD_RATING_RESULTS:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { results: action.results }
      )

    case cst.actions.DELETE_RATING:
      return state.filter((elt) => elt.id != action.id)

    default:
      return state
  }
}

export default ratings
