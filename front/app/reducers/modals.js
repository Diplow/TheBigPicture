
import * as cst from "../constants"

const initial_state = {
  [cst.CREATE_BIG_PICTURE_MODAL]: false,
  [cst.CREATE_ARGUMENT_MODAL]: false,
  [cst.LOGIN_MODAL]: false
};

const modals = (state = initial_state, action) => {
  switch (action.type) {
    case cst.ACTIVATE_MODAL:
      return {
        ...initial_state,
        [action.modal]: true
      }
    case cst.DEACTIVATE_MODAL:
      return {
        ...initial_state,
        [action.modal]: false
      }
    default:
      return state
  }
}

export default modals
