
import * as cst from "../constants"

const GUEST = {
  "username": cst.GUEST_NAME,
  "email": "",
  "groups": [],
  "url": "",
  "id": 0
}

const initial_state = {
  "user": localStorage.getItem('token') == null ? GUEST : JSON.parse(localStorage.getItem('user')),
  "token": localStorage.getItem('token')
};

const user = (state = initial_state, action) => {
  switch (action.type) {
    case cst.LOGIN:
      return {
        ...state,
        user: action.user,
        token: action.token
      }
    case cst.LOGOUT:
      return {
        "user": GUEST,
        "token": null
      }
    default:
      return state
  }
}

export default user
