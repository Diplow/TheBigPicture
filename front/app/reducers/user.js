
import * as cst from "../constants"


const GUEST = {
  "username": cst.GUEST_NAME,
  "email": "",
  "bio": "",
  "groups": [],
  "url": "",
  "image": "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/media/profile_images/login.png",
  "id": 0,
  "subscriptionCount": 1,
  "last_request": null
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
  ...initialUser(),
  "subscriptionCount": 1,
  "token": localStorage.getItem('token')
};


const user = (state = initial_state, action) => {
  switch (action.type) {

    case cst.ADD_USER:
      if (action.user.id == state.id)
        return {
          ...state,
          ...action.user
        }
      return state

    case cst.LOGIN:
      return {
        ...action.user,
        image: action.user.image,
        token: action.token,
        subscriptionCount: 1
      }

    case cst.SET_SUBSCRIPTION_COUNT:
      return {
        ...state,
        subscriptionCount: action.count,
        last_request: action.requestId
      }

    case cst.SET_GLOBAL_SUBJECT_COUNT:
    case cst.SET_OWN_SUBJECT_COUNT:
    case cst.SET_OWN_RATING_COUNT:
    case cst.SET_RATING_COUNT:
      return {
        ...state,
        last_request: action.requestId
      }

    case cst.ADD_BIG_PICTURE:
      return {
        ...state,
        last_request: action.bigpicture.request
      }

    case cst.ADD_RATING:
      return {
        ...state,
        last_request: action.rating.request
      }

    case cst.ADD_SUBSCRIPTION:
      return {
        ...state,
        last_request: action.subscription.request
      }

    case cst.LOGOUT:
      return {
        ...GUEST,
        token: null
      }

    default:
      return state
  }
}

export default user
