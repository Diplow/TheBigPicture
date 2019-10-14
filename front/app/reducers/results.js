
import * as cst from "../constants"


const results = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_RATING:
      const rating = action.rating
      if (rating.author == null)
        return state
      return [
        ...state.filter(elt => elt.target != rating.target || elt.author != rating.author),
        {
          author: parseInt(rating.author),
          value: rating.value,
          target: rating.target,
          subject: rating.subject,
          date: rating.date
        }
      ]

    default:
      return state
  }
}

export default results
