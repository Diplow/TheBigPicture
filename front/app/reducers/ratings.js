
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const addRating = (rating, state) => {
  const old = state.find((element) => element.id == rating.id)
  
  const addContext = (context, state) => {
    if (context && context.ratings) {
      for (let i = 0; i < context.ratings.length; ++i) {
        state = addRating(context.ratings[i], state)
      }
    }
    return state
  }

  state = addContext(rating.context, state)
  if (rating.reason == "") return state

  return [
    ...state.filter((elt) => elt.id != rating.id),
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
      date: rating.date,
      [rating.requestId]: rating[rating.requestId]
    }
  ]
}

const ratings = (state = [], action) => {
  switch (action.type) {

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

    case cst.actions.SET_RATING_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { ratingCount: action.count }
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
