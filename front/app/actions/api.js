import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"
import uuid from 'uuid/v4'


// "NEXTS" funcs are called asynchronously when related servers calls are done
// see front/app/reducers/requests.js for more details on this design.
const NEXTS = {
  "getSubjects": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setSubjectCount(result.count, requestId))
    }
  },
  "getBpRatings": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setBpRatingCount(nextargs.bigpicture, result.count, requestId))
    }
  },
  "getRatingRatings": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setRatingRatingCount(nextargs.rating, result.count, requestId))
    }
  },
  "getEndorsments": (dispatch, nextargs, requestId) => {
    return (result) => {
      if (nextargs.bigpicture)
        dispatch(basics.setBpEndorsmentCount(nextargs.bigpicture, result.count, requestId))
      if (nextargs.rating)
        dispatch(basics.setEndorsmentCount(nextargs.rating, result.count, requestId))
    }
  },
  "getOwnSubjects": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setOwnSubjectCount(nextargs.author, result.count, requestId))
    }
  },
  "getOwnRatings": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setOwnRatingCount(nextargs.author, result.count, requestId))
    }
  },
  "getSubscriptions": (dispatch, nextargs, requestId) => {
    return (result) => {
      dispatch(basics.setSubscriptionCount(result.count, requestId))
    }
  },
  "getReferences": (dispatch, nextargs, requestId) => {
    return (resp) => {
      dispatch(basics.setBpReferenceCount(resp.count, nextargs.reference, requestId))
      for (let i = 0; i < resp.results.length; ++i) {
        const bp = resp.results[i]
        dispatch(basics.addBigPicture(bp))
        dispatch(basics.addBigPictureReference(nextargs.reference, bp.id))
      }
    }
  },
  "getBigPictureResults": (dispatch, nextargs, requestId) => {
    return (resp) => {
      dispatch(basics.setBpEndorsmentCount(nextargs.bigpictureId, resp.count, requestId))
      dispatch(basics.addBigPictureResults(nextargs.bigpictureId, resp))
    }
  },
  "getRatingResults": (dispatch, nextargs, requestId) => {
    return (resp) => {
      dispatch(basics.setEndorsmentCount(nextargs.ratingId, resp.count, requestId))
      dispatch(basics.addRatingResults(nextargs.ratingId, resp))
    }
  },
}

export const make = (request) => {
  return (dispatch) => {
    const host = cst.SERVER_ADDR + request.url
    fetch(host, buildRequest(request.body, request.method))
    .then(res => {
      const success = res.status - 200 >= 0 && res.status - 300 < 0
      switch (request.method) {

        case "GET":
          if (!success) {
            dispatch(basics.notification(notification.GET_FAIL))
            break;
          }
          res.json().then(result => {
            dispatch(basics.done({
              ...request,
              success,
              response: result,
              status: res.status,
            }))
            return result
          }).then(NEXTS[request.next] != undefined ? NEXTS[request.next](dispatch, request.nextargs, request.id) : null)
          break;

        default:
          throw(Error("unknown request method " + request.method))

      }
    })
  }
}


const getCookie = (name) => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const buildRequest = (body, method) => {
  if (typeof(body.image) == "string") {
    delete body.image
  }
  const csrftoken = getCookie('csrftoken');
  const isAuthenticated = localStorage.getItem('token') != undefined
  const res = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrftoken,
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    body: JSON.stringify(body),
    method
  }
  if (body.image !== undefined) {
    // oh boy
    delete res.headers['Content-Type']
    let newbody = new FormData();
    for (const k of Object.keys(body)) {
      newbody.append(k, body[k])
    }
    res.body = newbody
  }
  if (cst.SAFE_METHODS.indexOf(method) != -1)
    delete res.body
  if (isAuthenticated)
    res.headers.Authorization = `JWT ${localStorage.getItem('token')}`
  return res
}


const DELETE_ACTIONS = {
  "bigpictures": basics.removeBigPicture,
  "ratings": basics.removeRating,
  "subscriptions": basics.removeSubscription,
  "endorsments": basics.removeEndorsment
}

export const deleteItem = (dispatch, itemId, itemAPI) => {
  const host = `${cst.SERVER_ADDR}${itemAPI}/${itemId}`
  fetch(host, buildRequest({}, "DELETE"))
    .then((res) => {
      if (res.status == 204) {
        const delete_action = DELETE_ACTIONS[itemAPI]
        dispatch(delete_action(itemId))
        dispatch(basics.notification(notifications.itemDeletion[itemAPI]))
      }
      else {
        dispatch(basics.notification(notifications.DELETION_FAIL))
      }
  })
}


const formatOptions = (options) => {
  const res = ["format=json"]
  for (let key of Object.keys(options))
    res.push(`${key}=${options[key]}`)
  return res
}

export const get = (dispatch, endpoint, options, next, must_process) => {
  const mustprocess = must_process || false // get requests dont get processed by default
  const opts = formatOptions(options)
  const url = endpoint
  const method = "GET"
  const body = {}
  dispatch(basics.make({
    url,
    body,
    method,
    next,
    mustprocess,
    nextargs: options,
    id: [method].concat(endpoint.split('/')).concat(opts).concat([uuid()]).join('-')
  }))
}

export const getItem = (dispatch, itemId, itemAPI, options) => {
  const opts = formatOptions(options)
  const url = `${itemAPI}/${itemId}/?${opts.join('&')}`
  const method = "GET"
  const body = {}
  dispatch(basics.make({
    url,
    body,
    method,
    id: [method, itemAPI, itemId].concat(opts).join('-'),
  }))
}

export const sendItem = (dispatch, item, itemAPI, action, options, method, next) => {
  const host = cst.SERVER_ADDR + itemAPI + options
  fetch(host, buildRequest(item, method))
    .then(handleHttpError(dispatch, "send"))
    .then(res => res.json())
    .then(res => {
      // TODO: error handling design is not well thought here...
      if (res.error != undefined) {
        dispatch(basics.notification(notifications.SERVER_ERROR(res.error)))
      }
      else if (Array.isArray(res.title)) {
        dispatch(basics.notification(notifications.TITLE_ERROR))
      }
      else if (Array.isArray(res.hyperlink_id)) {
        dispatch(basics.notification(notifications.REFERENCE_ERROR))
      }
      else {
        dispatch(action(res))
        const verb = method == "PATCH" ? notifications.itemModification : notifications.itemCreation
        dispatch(basics.notification(verb[itemAPI]))
        return res 
      }
    })
    .then(next)
}

export const getCollection = (dispatch, itemAPI, page, options, next, requestId) => {
  options.page = !page ? 1 : page
  const opts = formatOptions(options)
  const url = `${itemAPI}/?${opts.join('&')}`
  const method = "GET"
  const body = {}
  dispatch(basics.make({
    url,
    body,
    method,
    next,
    requestId,
    nextargs: options,
    id: [method, itemAPI].concat(opts).join('-')
  }, next))
}

const computeTokenTimeout = () => {
  const expirationDate = new Date()
  // token expire after 7 days. This value has to match the server value
  expirationDate.setDate(expirationDate.getDate() + 7)
  return expirationDate.getTime()
}

export const login = (credentials) => {
  return (dispatch) => {
    fetch(cst.SERVER_ADDR + 'token-auth/', buildRequest(credentials, "POST"))
      .then(handleHttpError(dispatch, "login"))
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
        localStorage.setItem('expiration', computeTokenTimeout())
        dispatch(basics.login(json.user, json.token))
        dispatch(basics.notification(notifications.WELCOME(json.user.username)))
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    delete localStorage.token;
    delete localStorage.user;
    dispatch(basics.logout())
    dispatch(basics.notification(notifications.LOGOUT))
  }
}

export const permissionDenied = (action) => {
  return (dispatch) => {
    dispatch(logout())
  }
}

export const handleHttpError = (dispatch, action) => {
  return (res) => {
    switch (res.status) {
      case 400:
        if (action == "login")
          dispatch(basics.notification(notifications.IDENTIFICATION_FAIL))
      case 401:
        dispatch(permissionDenied(action))
        dispatch(basics.notification(notifications.SESSION_EXPIRED))
      case 500:
      case 503:
        dispatch(basics.notification(notifications.SERVER_ERROR_500(action)))
      default:
        return res
    }
  }
}
