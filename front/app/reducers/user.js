
import * as cst from "../constants"


const GUEST = {
  "username": cst.labels.GUEST_NAME,
  "email": "",
  "bio": "",
  "groups": [],
  "url": "",
  "image": "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/media/profile_images/login.png",
  "id": 0
}

const initialUser = () => {
  if (!localStorage.getItem('token')) return GUEST
  if (!localStorage.getItem('expiration')) return GUEST

  const currentDate = new Date()
  const expirationDate = new Date(parseInt(localStorage.expiration))

  if (expirationDate.getTime() < currentDate.getTime()) {
    delete localStorage.user
    delete localStorage.token
    delete localStorage.expiration
    return GUEST
  }

  const user = localStorage.getItem('user')
  if (!user == null) return GUEST
  return JSON.parse(user)
}


const initial_state = {
  ...initialUser(),
  "token": localStorage.getItem('token')
};


const user = (state = initial_state, action) => {
  switch (action.type) {

    case cst.actions.ADD_USER:
      if (action.user.id == state.id)
        return {
          ...state,
          ...action.user
        }
      return state

    case cst.actions.LOGIN:
      return {
        ...action.user,
        image: action.user.image,
        token: action.token
      }

    case cst.actions.SET_OWN_SUBSCRIPTION_COUNT:
      return {
        ...state,
        subscriptionCount: action.count
      }

    case cst.actions.SET_OWN_RATING_COUNT:
      return {
        ...state,
        ratingCount: action.count
      }

    case cst.actions.SET_OWN_SUBJECT_COUNT:
      return {
        ...state,
        subjectCount: action.count
      }

    case cst.actions.LOGOUT:
      return {
        ...GUEST,
        token: null
      }

    default:
      return state
  }
}

export default user
