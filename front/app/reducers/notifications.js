import * as cst from "../constants"

const DEFAULT_NOTIFICATION = {
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: { duration: 2000 },
  dismissable: { click: true }
}

const notifications = (state = [], action) => {
  switch (action.type) {

    case cst.actions.ADD_NOTIFICATION:
      if (action.notif.message == undefined || action.notif.type == undefined)
        return state
      return [
        ...state,
        {
          ...DEFAULT_NOTIFICATION,
          ...action.notif,
        }
      ]

    case cst.actions.POP_NOTIFICATION:
      return state.filter((notif) => notif.id != action.id)

    default:
      return state
  }
}

export default notifications
