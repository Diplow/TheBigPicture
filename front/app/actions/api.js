import * as cst from "../constants"
import * as basics from "./basics"


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
  if (cst.SAFE_METHODS.indexOf(method) != -1)
    delete res.body
  else if (isAuthenticated )
    res.headers.Authorization = `JWT ${localStorage.getItem('token')}`
  return res
}


export const deleteItem = (dispatch, itemId, itemAPI, action) => {
  const host = cst.SERVER_ADDR + itemAPI + "/" + itemId + "/?format=json";
  fetch(host, buildRequest({}, "DELETE"))
    .then(handlePermissionDenied(dispatch, "delete"))
    .then(res => {
      if (res.status == 204)
        dispatch(action(itemId))
    })
}

export const getItem = (dispatch, itemId, itemAPI, action, next) => {
  const host = cst.SERVER_ADDR + itemAPI + "/" + itemId + "/?format=json";
  fetch(host, buildRequest({}, "GET"))
    .then(handlePermissionDenied(dispatch, "getItem"))
    .then(res => res.json())
    .then(item => { dispatch(action(item)); return item })
    .then(next)
}

export const sendItem = (dispatch, item, itemAPI, action, options, method, next) => {
  const host = cst.SERVER_ADDR + itemAPI + options
  fetch(host, buildRequest(item, method))
    .then(handlePermissionDenied(dispatch, "send"))
    .then(res => res.json())
    .then(res => { dispatch(action(res)); return res; })
    .then(next)
}

export const getCollection = (dispatch, api, action, options) => {
  const host = cst.SERVER_ADDR + api + options;
  fetch(host, buildRequest({}, "GET"))
    .then(handlePermissionDenied(dispatch, "getCollection"))
    .then(res => res.json())
    .then(res => {
      for(let i=0; i < res["results"].length; ++i) {
        dispatch(action(res["results"][i]));
      }
      return res;
    })
}

export const login = (credentials) => {
  return (dispatch) => {
    fetch(cst.SERVER_ADDR + 'token-auth/', buildRequest(credentials, "POST"))
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
        dispatch(basics.login(json.user, json.token))
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    delete localStorage.token;
    delete localStorage.user;
    dispatch(basics.logout())
  }
}

export const permissionDenied = (action) => {
  return (dispatch) => {
    dispatch(logout())
    dispatch(basics.notification("Authentifiez-vous pour réaliser cette action: " + action))
  }
}

export const handlePermissionDenied = (dispatch, action) => {
  return (res) => {
    if (res.status == 401) {
      dispatch(permissionDenied(action))
      throw Error("Permission Denied")
    }
    return res
  }
}
