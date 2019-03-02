
import { ADD_ARGUMENT, DELETE_ARGUMENT } from "../constants"

const args = (state = [], action) => {
  switch (action.type) {
    case ADD_ARGUMENT:
      const arg = action.bigpicture;
      return [
        ...state.filter(element => element.id != arg.id),
        {
          id: arg.id,
          title: arg.title,
          body: arg.body,
          bigPicture: arg.bigPicture,
          nature: arg.nature
        }
      ]
    case DELETE_ARGUMENT:
      return state.filter(element => element.id != action.id)
    default:
      return state
  }
}

export default args