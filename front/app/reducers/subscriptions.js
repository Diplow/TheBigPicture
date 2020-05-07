
import * as cst from "../constants"


const subscriptions = (state = [], action) => {
  switch (action.type) {

    case cst.DELETE_SUBSCRIPTION:
      return state.filter(sub => sub.id != action.id)

    case cst.ADD_SUBSCRIPTION:
      let subscription = action.subscription
      let old = state.find(element => element.id == subscription.id)
      return [
        ...state.filter(sub => sub.id != subscription.id),
        {
          id: subscription.id,
          target_id: subscription.target.id,
          author: subscription.author,
          date: subscription.date,
          [subscription.request]: subscription[subscription.request]
        }
      ]

    default:
      return state
  }
}

export default subscriptions
