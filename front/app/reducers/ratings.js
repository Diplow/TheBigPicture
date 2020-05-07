
import * as cst from "../constants"


const ratings = (state = [], action) => {
  let old = null

  switch (action.type) {

    case cst.ADD_RATING:
      const rating = action.rating
      if (rating.author == null || rating.endorsment != null || rating.reason == "")
        return state
      return [
        ...state.filter(elt => elt.id != rating.id),
        {
          id: rating.id,
          author: rating.author.id,
          author_id: rating.author.id,
          value: parseInt(rating.value),
          target_bp: rating.target_bp,
          target_rating: rating.target_rating,
          ratingCount: rating.ratingCount,
          reason: rating.reason,
          subject: rating.subject,
          date: rating.date,
          [rating.request]: rating[rating.request]
        }
      ]

    case cst.ADD_RATING_RESULTS:
      old = state.find(element => element.id == action.ratingId)
      return [
        ...state.filter(element => element.id != old.id),
        {
          ...old,
          results: action.results
        }
      ]

    case cst.DELETE_RATING:
      return state.filter(elt => elt.id != action.id)

    default:
      return state
  }
}

export default ratings
