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
    .then(handleHttpError(dispatch, "delete"))
    .then(res => {
      if (res.status == 204) {
        dispatch(action(itemId))
        dispatch(basics.notification({
          title: "Élément supprimé",
          message: "L'élément n'existe plus dans les bases de données du serveur.",
          type: "success"
        }))
      }
    })
}

export const getItem = (dispatch, itemId, itemAPI, action, next) => {
  const host = cst.SERVER_ADDR + itemAPI + "/" + itemId + "/?format=json";
  fetch(host, buildRequest({}, "GET"))
    .then(handleHttpError(dispatch, "getItem"))
    .then(res => res.json())
    .then(item => { dispatch(action(item)); return item })
    .then(next)
}

export const sendItem = (dispatch, item, itemAPI, action, options, method, next) => {
  const host = cst.SERVER_ADDR + itemAPI + options
  fetch(host, buildRequest(item, method))
    .then(handleHttpError(dispatch, "send"))
    .then(res => res.json())
    .then(res => {
      dispatch(action(res))
      const verb = method == "PATCH" ? "modifié" : "créé"
      dispatch(basics.notification({
        title: "Élément " + verb,
        message: "L'élément a bien été " + verb + " dans la base de données.",
        type: "success"
      }))
      return res 
    })
    .then(next)
}

export const getCollection = (dispatch, api, action, options) => {
  const host = cst.SERVER_ADDR + api + options;
  fetch(host, buildRequest({}, "GET"))
    .then(handleHttpError(dispatch, "getCollection"))
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
      .then(handleHttpError(dispatch, "login"))
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
        dispatch(basics.login(json.user, json.token))
        dispatch(basics.notification({
          title: "Identification réussie",
          message: "Bienvenue " + json.user.username,
          type: "success"
        }))
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    delete localStorage.token;
    delete localStorage.user;
    dispatch(basics.logout())
    dispatch(basics.notification({
      title: "Déconnexion réussie",
      message: "Vous devrez vous authentifier à nouveau pour utiliser votre compte.",
      type: "success"
    }))
  }
}

export const permissionDenied = (action) => {
  return (dispatch) => {
    dispatch(logout())
  }
}

export const handleHttpError = (dispatch, action) => {
  return (res) => {
    if (res.status == 200)
      return res
    if (res.status == 400) {
      if (action == "login") {
        dispatch(basics.notification({
          title: "L'identification a échoué",
          message: "Êtes-vous certains d'avoir entré la bonne combinaison identifiant / mot de passe ?",
          type: "warning"
        }))
        throw Error("L'identification a échoué")
      }
    }
    if (res.status == 401) {
      dispatch(permissionDenied(action))
      dispatch(basics.notification({
        title: "Session expirée",
        message: "Vous devez vous authentifier à nouveau pour réaliser cette action.",
        type: "warning"
      }))
      throw Error("Permission Denied")
    }
    if (res.status < 200 || res.status > 299) {
      dispatch(basics.notification({
        title: "Erreur de communication avec le serveur",
        message: "L'action " + action + " n'a pas pu être réalisée, vous pouvez contacter l'administrateur de la plateforme.",
        type: "warning"
      }))
      console.log("error", res)
      throw Error("Error: could not perform " + action)
    }
    return res
  }
}
