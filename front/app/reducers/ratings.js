
import * as reducer_utils from "./utils"
import * as cst from "../constants"


const ratings = (state = [], action) => {
  let old = null
  let rating = null
  let ratingId = null
  let count = null

  switch (action.type) {

    case cst.ADD_RATING:
      rating = action.rating
      old = state.find(element => element.id == rating.id)
      if (rating.reason == "") return state
      return [
        ...state.filter(elt => elt.id != rating.id),
        {
          ...old,
          id: rating.id,
          author: rating.author.id,
          author_id: rating.author.id,
          target_bp: rating.target_bp,
          target_rating: rating.target_rating,
          body: rating.body,
          subject: rating.subject,
          endorsmentCount: rating.endorsmentCount,
          date: rating.date,
          [rating.requestId]: rating[rating.requestId]
        }
      ]

    case cst.SET_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { endorsmentCount: action.count }
      )

    case cst.SET_RATING_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { ratingCount: action.count }
      )

    case cst.ADD_RATING_RESULTS:
      return reducer_utils.update_item(
        state,
        action.ratingId,
        { results: action.results }
      )

    case cst.DELETE_RATING:
      return state.filter(elt => elt.id != action.id)

    default:
      return state
  }
}

export default ratings
