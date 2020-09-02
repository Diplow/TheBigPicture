
import * as cst from "../constants"


const reasons = (state = [], action) => {
  switch (action.type) {

    case cst.actions.ADD_REASON:
      const newReason = action.reason
      return [
        ...state.filter((reason) => (
          reason.target !== newReason.content.id
          || reason.code !== newReason.code
        )),
        {
          target_bp: newReason.target_bp,
          target_rating: newReason.target_rating,
          code: newReason.code,
          count: newReason.count,
          content: newReason.content.body,
          target: newReason.content.id
        }
      ]

    default:
      return state
  }
}

export default reasons
