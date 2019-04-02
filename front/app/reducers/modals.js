
import * as cst from "../constants"

const initial_state = {
  [cst.CREATE_BIG_PICTURE_MODAL]: null,
  [cst.CREATE_ARGUMENT_MODAL]: null,
  [cst.LOGIN_MODAL]: null
};

const modals = (state = initial_state, action) => {
  switch (action.type) {
    case cst.ACTIVATE_MODAL:
      return {
        ...initial_state,
        [action.modal]: action.bigPicture
      }
    case cst.DEACTIVATE_MODAL:
      return {
        ...initial_state,
        [action.modal]: null
      }
    default:
      return state
  }
}

export default modals
