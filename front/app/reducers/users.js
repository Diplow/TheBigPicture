
import * as cst from "../constants"


const users = (state = [], action) => {
  let old = null

  switch (action.type) {

    case cst.SET_OWN_SUBJECT_COUNT:
      let usrId = action.userId
      let count = action.count
      old = state.find(element => element.id == usrId)
      return[
        ...state.filter(user => user.id != usrId),
        {
          ...old,
          ownSubjectCount: count
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
          ownSubjectCount: old != null ? old.ownSubjectCount : 1,
          ratedSubjects: old != null ? old.ratedSubjects : [],
        }
      ]

    default:
      return state
  }
}

export default users
