
import * as cst from "../constants"


const endorsments = (state = [], action) => {
  switch (action.type) {

    case cst.actions.DELETE_ENDORSMENT:
      return state.filter((item) => item.id != action.id)

    case cst.actions.ADD_ENDORSMENT:
      let endorsment = action.endorsment
      let old = state.find((item) => item.id == endorsment.id)
      return [
        ...state.filter((item) => item.id != endorsment.id),
        {
          id: endorsment.id,
          target_id: endorsment.target !== undefined ? endorsment.target.id : endorsment.target_id,
          author_id: endorsment.author !== undefined ? endorsment.author.id : endorsment.author_id,
          bigPicture: endorsment.target.target_bp,
          rating: endorsment.target.target_rating,
          date: endorsment.date,
          value: parseInt(endorsment.value),
          [endorsment.requestId]: endorsment[endorsment.requestId]
        }
      ]

    default:
      return state
  }
}

export default endorsments
