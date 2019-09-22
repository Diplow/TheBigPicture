
import * as cst from "../constants"


const GUEST = {
  "username": cst.GUEST_NAME,
  "email": "",
  "groups": [],
  "url": "",
  "id": 0
}


const initialUser = () => {
  if (localStorage.getItem('token') == null)
    return GUEST

  if (localStorage.getItem('expiration') == null)
    return GUEST

  const currentDate = new Date()
  const expirationDate = new Date(parseInt(localStorage.expiration))

  if (expirationDate.getTime() < currentDate.getTime()) {
    delete localStorage.user
    delete localStorage.token
    delete localStorage.expiration
    return GUEST
  }

  const user = localStorage.getItem('user')
  if (user == null)
    return GUEST
  return JSON.parse(user)
}


const initial_state = {
  "user": initialUser(),
  "token": localStorage.getItem('token')
};


const user = (state = initial_state, action) => {
  switch (action.type) {
    case cst.LOGIN:
      const newState = {
        ...state,
        user: action.user,
        token: action.token
      }
      return newState
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
