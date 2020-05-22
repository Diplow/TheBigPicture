
import * as cst from "../constants"
import * as reducer_utils from "./utils"


const users = (state = [], action) => {
  let old = null
  let usrId = null
  let count = null

  switch (action.type) {

    case cst.actions.ADD_GIVEN_REASON:
      return reducer_utils.add_item_to_set(
        state,
        action.userId,
        "reasons",
        action.ratingId
      )

    case cst.actions.SET_OWN_SUBJECT_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { subjectCount: action.count }
      )

    case cst.actions.SET_USER_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { ratingCount: action.count }
      )

    case cst.actions.SET_USER_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { endorsmentCount: action.count }
      )

    case cst.actions.ADD_SUBSCRIPTION:
      const subscription = action.subscription
      const target = state.find(user => user.id == subscription.target_id)
      return reducer_utils.update_item(
        state,
        subscription.target_id,
        { favorite: true }
      )

    case cst.actions.ADD_USER:
      let usr = action.user
      old = state.find(element => element.id == usr.id)
      return [
        ...state.filter(user => user.id != usr.id),
        {
          id: usr.id,
          username: usr.username,
          image: usr.image,
          bio: usr.bio,
          subjectCount: old != null ? old.subjectCount : undefined,
          ratingCount: old != null ? old.ratingCount : undefined,
          endorsmentCount: old != null ? old.endorsmentCount : undefined,
          reasons: reducer_utils.set_or_update("reasons", usr, old, []),
          favorite: old == null ? usr.favorite : old.favorite
        }
      ]

    default:
      return state
  }
}

export default users
