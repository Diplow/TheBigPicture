
import * as cst from "../constants"


const users = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_USER:
      const usr = action.user
      return [
        ...state.filter(user => user.id != usr.id),
        usr
      ]

    default:
      return state
  }
}

export default users
