import {
  addArgument,
  addBigPicture,
  addResource,
  addResourceToBigPicture,
  removeArgument,
  removeBigPicture,
  removeResource } from "./basics"

const SERVER_ADDR = "/api/"

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


const buildRequest = (body, method) => {
  const csrftoken = getCookie('csrftoken');
  return {
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
}

const deleteItem = (dispatch, itemId, itemAPI, action) => {
  const host = SERVER_ADDR + itemAPI + "/" + itemId + "/?format=json";
  fetch(host, buildRequest({}, "DELETE"))
    .then(res => {
      if (res.status == 204)
        dispatch(action(itemId))
    })
}

const getItem = (dispatch, itemId, itemAPI, action) => {
  const host = SERVER_ADDR + itemAPI + "/" + itemId + "?format=json";
  fetch(host)
    .then(res => res.json())
    .then(item => { dispatch(action(item)) })
}

const sendItem = (dispatch, item, itemAPI, action, options, method, next) => {
  const host = SERVER_ADDR + itemAPI + options
  return fetch(host, buildRequest(item, method))
    .then(res => res.json())
    .then(res => { dispatch(action(res)); return res; })
    .then(next)
}

const getCollection = (dispatch, api, action, options) => {
  const host = SERVER_ADDR + api + options;
  fetch(host)
    .then(res => res.json())
    .then(res => {
      for(let i=0; i < res["results"].length; ++i) {
        dispatch(action(res["results"][i]));
      }
      return res;
    })
}

export const postArgument = (argument) => {
  return (dispatch) => {
    sendItem(dispatch, argument, "arguments", addArgument, "/", "POST")
  }
}


export const patchBigPicture = (bigPicture) => {
  return (dispatch) => {
    sendItem(dispatch, bigPicture, "bigpictures", addBigPicture, "/" + bigPicture.id + "/", "PATCH")
  }
}

export const postResource = (resource) => {
  return (dispatch) => {
    const next = (res) => {
      dispatch(getBigPicture(resource.resourceFor))
    }
    // the API is the same for resources and bigpictures since it is the same kind of object
    sendItem(dispatch, resource, "bigpictures", addResource, "/?format=json", "POST", next)
  }
}

export const getBigPictures = () => {
  return (dispatch) => {
    getCollection(dispatch, "bigpictures", addBigPicture, "/?format=json")
  }
}

export const getArguments = (bigpictureId) => {
  return (dispatch) => {
    getCollection(dispatch, "arguments", addArgument, "/?element=" + bigpictureId)
  }
}

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    getCollection(dispatch, "bigpictures", addResource, "/?element=" + bigpictureId)
  }
}

export const getBigPicture = (id) => {
  return (dispatch) => {
    getItem(dispatch, id, "bigpictures", addBigPicture)
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    deleteItem(dispatch, id, "bigpictures", removeBigPicture)
  }
}

export const deleteArgument = (id) => {
  return (dispatch) => {
    deleteItem(dispatch, id, "arguments", removeArgument)
  }
}

export const deleteResource = (id) => {
  return (dispatch) => {
    deleteItem(dispatch, id, "bigpictures", removeResource)
  }
}
