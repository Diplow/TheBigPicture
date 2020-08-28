
import * as cst from "../constants"


const globalState = (state = {}, action) => {
  switch (action.type) {

    case cst.actions.SET_GLOBAL_SUBJECT_COUNT:
      return {
        ...state,
        subjectCount: action.count
      }

    case cst.actions.SET_GLOBAL_CATEGORY_COUNT:
      return {
        ...state,
        categoryCount: action.count
      }

    default:
      return state
  }
}

export default globalState
