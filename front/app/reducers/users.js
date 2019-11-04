
import * as cst from "../constants"


const users = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_USER:
      let usr = action.user
      let old_usr = state.find(user => user.id == usr.id)
      return [
        ...state.filter(user => user.id != usr.id),
        {
          ...old_usr,
          ...usr,
          ownSubjectCount: (old_usr == undefined || old_usr.ownSubjectCount == undefined) ? cst.PAGE_SIZE : old_usr.ownSubjectCount,
          ratedSubjectCount: (old_usr == undefined || old_usr.ratedSubjectCount == undefined) ? cst.PAGE_SIZE : old_usr.ratedSubjectCount 
        }
      ]

    case cst.SET_OWN_SUBJECT_COUNT:
      old_usr = state.find(user => user.id == action.userId)
      return [
        ...state.filter(user => user.id != action.userId),
        {
          ...old_usr,
          id: parseInt(action.userId),
          ownSubjectCount: action.count
        }
      ]

    case cst.SET_RATED_SUBJECT_COUNT:
      old_usr = state.find(user => user.id == action.userId)
      return [
        ...state.filter(user => user.id != action.userId),
        {
          ...old_usr,
          id: parseInt(action.userId),
          ratedSubjectCount: action.count
        }
      ]

    default:
      return state
  }
}

export default users
