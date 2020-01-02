
import * as cst from "../constants"


const results = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_RATING:
      const rating = action.rating
      if (rating.author == null)
        return state
      return [
        ...state.filter(elt => elt.id != rating.id),
        {
          id: rating.id,
          author: rating.author.id,
          value: rating.value,
          target_bp: rating.target_bp,
          target_rating: rating.target_rating,
          ratingCount: rating.ratingCount,
          reason: rating.reason,
          subject: rating.subject,
          date: rating.date
        }
      ]

    default:
      return state
  }
}

export default results
