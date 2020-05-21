
import * as cst from "../constants"


const subscriptions = (state = [], action) => {
  switch (action.type) {

    case cst.actions.DELETE_SUBSCRIPTION:
      return state.filter(sub => sub.id != action.id)

    case cst.actions.ADD_SUBSCRIPTION:
      let subscription = action.subscription
      let old = state.find(element => element.id == subscription.id)
      return [
        ...state.filter(sub => sub.id != subscription.id),
        {
          id: subscription.id,
          target_id: subscription.target !== undefined ? subscription.target.id : subscription.target_id,
          author: subscription.author,
          date: subscription.date,
          [subscription.requestId]: subscription[subscription.requestId]
        }
      ]

    default:
      return state
  }
}

export default subscriptions
