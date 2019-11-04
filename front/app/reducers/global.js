
import * as cst from "../constants"


const initial_state = {
  subjectCount: 0
};


const globalState = (state = initial_state, action) => {
  switch (action.type) {

    case cst.SET_GLOBAL_SUBJECT_COUNT:
      return {
        ...state,
        subjectCount: action.count
      }

    default:
      return state
  }
}

export default globalState
