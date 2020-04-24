
import * as cst from "../constants"


/**
  Requests are objects encapsulating HTTP requests.
  They solve two problems:
    - They reduce the number of requests send to the server by not resending a request
    that has already been responded to.
    - They offer a way to globally keep track of an ongoing http request

  TODO: There is probably a better practice for this use case. Non-exhaustive list of
  issues caused by this implementation:
    - Huge overhead on top of the basic "fetch API" (see /actions/api.js, components/Api)
    - 
**/

const requests = (state = [], action) => {
  switch (action.type) {

    case cst.LOGOUT:
      return []

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
          next: request.next,
          nextargs: request.nextargs,
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
