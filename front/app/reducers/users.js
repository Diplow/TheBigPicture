
import * as cst from "../constants"


const users = (state = [], action) => {
  let old = null
  let usrId = null
  let count = null

  switch (action.type) {

    case cst.SET_OWN_SUBJECT_COUNT:
      usrId = action.userId
      count = action.count
      old = state.find(element => element.id == usrId)
      return [
        ...state.filter(user => user.id != usrId),
        {
          ...old,
          ownSubjectCount: count
        }
      ]

    case cst.SET_RATING_COUNT:
    case cst.SET_OWN_RATING_COUNT:
      usrId = action.userId
      count = action.count
      old = state.find(element => element.id == usrId)
      return [
        ...state.filter(user => user.id != usrId),
        {
          ...old,
          ownRatingCount: count
        }
      ]

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
          ownSubjectCount: old != null ? old.ownSubjectCount : 1,
          ownRatingCount: old != null ? old.ownSubjectCount : 1,
          favorite: old == null ? usr.favorite : old.favorite
        }
      ]

    default:
      return state
  }
}

export default users
