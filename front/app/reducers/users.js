
import * as cst from "../constants"
import * as reducer_utils from "./utils"


const users = (state = [], action) => {
  let old = null
  let usrId = null
  let count = null

  switch (action.type) {

    case cst.SET_OWN_SUBJECT_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { ownSubjectCount: action.count }
      )

    case cst.SET_OWN_RATING_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { ownRatingCount: action.count }
      )

    case cst.SET_USER_ENDORSMENT_COUNT:
      return reducer_utils.update_item(
        state,
        action.userId,
        { endorsmentCount: action.count }
      )

    case cst.ADD_SUBSCRIPTION:
      const subscription = action.subscription
      const target = state.find(user => user.id == subscription.target_id)
      return reducer_utils.update_item(
        state,
        subscription.target_id,
        { favorite: true }
      )

    case cst.ADD_USER:
      let usr = action.user
      old = state.find(element => element.id == usr.id)
      return [
        ...state.filter(user => user.id != usr.id),
        {
          id: usr.id,
          username: usr.username,
          image: usr.image,
          bio: usr.bio,
          ownSubjectCount: old != null ? old.ownSubjectCount : undefined,
          ownRatingCount: old != null ? old.ownRatingCount : undefined,
          endorsmentCount: old != null ? old.endorsmentCount : undefined,
          favorite: old == null ? usr.favorite : old.favorite
        }
      ]

    default:
      return state
  }
}

export default users
