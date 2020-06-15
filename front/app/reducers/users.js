
import * as cst from "../constants"
import * as reducer_utils from "./utils"


const addUser = (usr, state) => {
  if (!usr.id) return state
  const old = state.find((element) => element.id == usr.id)
  return [
    ...state.filter((user) => user.id != usr.id),
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
} 

const users = (state = [], action) => {
  let old = null
  let usrId = null
  let usr = null
  let count = null
  let subscription = null

  switch (action.type) {

    case cst.actions.ADD_USER:
      return addUser(action.user, state)

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

    case cst.actions.DELETE_SUBSCRIPTION:
      return reducer_utils.update_item(
        state,
        action.targetId,
        { favorite: false }
      )

    case cst.actions.CREATE_SUBSCRIPTION:
    case cst.actions.ADD_SUBSCRIPTION:
      subscription = action.subscription
      return reducer_utils.update_item(
        addUser({ ...subscription.target, favorite: true }, state),
        subscription.target_id,
        { favorite: true }
      )

    case cst.actions.ADD_ENDORSMENT:
      // when adding an endorsment, also update the reasons field
      // so it is not needed to reload the page to have the reasons list
      // correctly displayed
      return reducer_utils.add_item_to_set(
        addUser(action.endorsment.author, state), // also add the author
        action.endorsment.author !== undefined ? action.endorsment.author.id : action.endorsment.author_id,
        "reasons",
        action.endorsment.target !== undefined ? action.endorsment.target.id : action.endorsment.target_id
      )

    case cst.actions.ADD_BIG_PICTURE:
      const favorite = action.bigpicture.favorite
      return addUser({ ...action.bigpicture.author, favorite }, state)

    default:
      return state
  }
}

export default users
