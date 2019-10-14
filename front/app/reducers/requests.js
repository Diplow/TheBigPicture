
import * as cst from "../constants"


const requests = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_REQUEST:
      const request = action.request
      if (state.find(elt => elt.id == request.id) != null)
        return state
      return [
        ...state.filter(elt => elt.id != request.id),
        {
          id: request.id,
          sender: request.sender,
          url: request.url,
          body: request.body,
          method: request.method,
          state: cst.REQUEST_CREATED
        }
      ]

    case cst.REQUEST_DONE:
      return [
        ...state.filter(elt => elt.id != action.id),
        {
          ...state.find(elt => elt.id == action.id),
          state: cst.REQUEST_DONE,
          success: action.success,
          status: action.status,
          response: action.response

        }
      ]

    case cst.REQUEST_PROCESSED:
      return [
        ...state.filter(elt => elt.id != action.id),
        {
          ...state.find(elt => elt.id == action.id),
          state: cst.REQUEST_PROCESSED,
        }
      ]

    default:
      return state
  }
}

export default requests
