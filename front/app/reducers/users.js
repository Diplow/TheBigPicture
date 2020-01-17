
import * as cst from "../constants"


const users = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_USER_RATED_SUBJECT:
      let old = state.find(element => element.id == action.userId)
      return [
        ...state.filter(element => element.id != old.id),
        {
          ...old,
          ratedSubjects: [...old.ratedSubjects.filter(subj => subj != action.subjectId), action.subjectId]
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
          ownSubjectCount: usr.ownSubjectCount,
          ratedSubjectCount: usr.ratedSubjectCount,
          ratedSubjects: old != null ? old.ratedSubjects : [],
        }
      ]

    default:
      return state
  }
}

export default users
