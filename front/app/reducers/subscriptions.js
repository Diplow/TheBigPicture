
import * as cst from "../constants"


const addSubscription = (subscription, state) => {
  const targetId = subscription.target !== undefined ? subscription.target.id : subscription.target_id
  const  old = state.find(sub => sub.target_id == targetId)
  return [
    ...state.filter(sub => sub.target_id != targetId),
    {
      ...old,
      target_id: targetId,
      date: subscription.date,
      [subscription.requestId]: subscription[subscription.requestId]
    }
  ]
}

const subscriptions = (state = [], action) => {
  switch (action.type) {

    case cst.actions.DELETE_SUBSCRIPTION:
      return state.filter(sub => sub.target_id != action.targetId)

    case cst.actions.CREATE_SUBSCRIPTION:
    case cst.actions.ADD_SUBSCRIPTION:
      let subscription = action.subscription
      return addSubscription(subscription, state)

    case cst.actions.ADD_BIG_PICTURE:
      if (action.bigpicture.favorite)
        return addSubscription({ target_id: action.bigpicture.author }, state)
      return state

    default:
      return state
  }
}

export default subscriptions
