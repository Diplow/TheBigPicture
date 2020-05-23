
import * as cst from "../constants"
import * as reducer_utils from "./utils"


/**
  Requests are objects encapsulating HTTP requests.
  They solve two problems:
    - They reduce the number of requests send to the server by not
    resending a request that has already been responded to.
    - They offer a way to globally keep track of requests

  The implementation of this design works as follow:
    1- When it is needed to send a request to the server (the list of subjects
    for the homepage for example), a request object is created (with the state
    cst.actions.REQUEST_CREATED), encapsulating all information needed to send the
    request (/actions/basics.js:make).
    2- An "APIEngine" (/components/Api/index.js) sends every request with the
    state cst.actions.REQUEST_CREATED and sets the current request state to
    cst.actions.REQUEST_ONGOING (see /actions/api.js:make).
    3- Once it has received the server response (still /actions/api.js:make),
    it stores it in the request data and sets the request state to
    cst.actions.REQUEST_DONE.
    4- All the "done" requests are then processed by an "Executor"
    (/components/Api/executor.js). Basically it dispatches actions based
    on the answer received from the server. Once it is done, it sets
    the request state to cst.actions.REQUEST_PROCESSED
  
  TODO: There is probably a better practice for this use case...
**/

const requests = (state = [], action) => {
  let request = null

  switch (action.type) {

    case cst.actions.LOGOUT:
      return []

    case cst.actions.ADD_REQUEST:
      request = action.request
      const old = state.find(elt => elt.id == request.id)

      // If an old, already processed, request is added, just give it
      // the state of a done request but not already processed.
      // This way, it will not be sent to the server but the server resp
      // will be processed again.
      if (old != null && old.state == cst.actions.REQUEST_PROCESSED) {
        return reducer_utils.update_item(
          state,
          old.id,
          {
            requestId: request.requestId,
            state: cst.actions.REQUEST_DONE
          }
        )
      }

      return [
        ...state.filter(elt => elt.id != request.id),
        {
          id: request.id, // this ID is used to identify what a request is doing
          requestId: request.requestId, // this ID is an uuid used by "getCollections"
          user: localStorage.user !== undefined ? JSON.parse(localStorage.user).id : 0,
          url: request.url,
          body: request.body,
          method: request.method,
          next: request.next, // an identifier to execute specifics followup asynschronously
          nextargs: request.nextargs, // args given to the specified followup 
          // set mustprocess to false if the request must be ignored by the ApiExecutor
          mustprocess: request.mustprocess !== undefined ? request.mustprocess : true,
          state: cst.actions.REQUEST_CREATED
        }
      ]

    case cst.actions.REQUEST_ONGOING:
      return reducer_utils.update_item(
        state,
        action.request.id,
        { state: cst.actions.REQUEST_ONGOING }
      )

    case cst.actions.REQUEST_DONE:
      request = action.request
      return reducer_utils.update_item(
        state,
        request.id,
        {
          state: cst.actions.REQUEST_DONE,
          success: request.success,
          status: request.status,
          response: request.response
        }
      )

    case cst.actions.REQUEST_PROCESSED:
      return reducer_utils.update_item(
        state,
        action.request.id,
        { state: cst.actions.REQUEST_PROCESSED }
      )

    case cst.actions.CREATE_SUBSCRIPTION:
    case cst.actions.DELETE_SUBSCRIPTION:
      // If subscriptions are modified, favorites requests become irrelevant
      return state.filter(req => !req.id.includes("favorite"))


    default:
      return state
  }
}

export default requests
