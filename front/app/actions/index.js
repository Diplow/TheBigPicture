import {
  ADD_ARGUMENT,
  ADD_BIG_PICTURE,
  ADD_RESOURCE,
  DELETE_ARGUMENT,
  DELETE_BIG_PICTURE } from "../constants"


export const addBigPicture = (bigpicture) => {
  return {
    type: ADD_BIG_PICTURE,
    bigpicture
  }
}

export const addArgument = (argument) => {
  return {
    type: ADD_ARGUMENT,
    arg: argument
  }
}

export const addResource = (resource) => {
  return {
    type: ADD_RESOURCE,
    resource
  }
}

export const postArgument = (argument) => {
  return (dispatch) => {
    const host = "http://localhost:8000/arguments/"
    fetch(host, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: argument.content,
          obj: argument.target,
          title: argument.title,
          nature: argument.nature
        })
      })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: ADD_ARGUMENT,
        arg: res
      })
    })
  }
}

export const postResource = (resource) => {
  return (dispatch) => {
    const host = "http://localhost:8000/resources/"
    console.log("POST RESOURCE, ", resource.bigpictures)
    fetch(host, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: resource.body,
        title: resource.title,
        bigpictures: resource.bigpictures
      })
    })
    .then(res => res.json())
    .then(res => {
      res.bigpictures = resource.bigpictures;
      dispatch({
        type: ADD_RESOURCE,
        resource: res
      })
    })
  }
}

export const getBigPictures = () => {
  return (dispatch) => {
    const host = "http://localhost:8000/bigpictures/?format=json";
    fetch(host)
      .then(res => res.json())
      .then(res => {
        for(let i=0; i < res["results"].length; ++i)
          dispatch(addBigPicture(res["results"][i]));
      })
  }
}

export const getArguments = (bigpictureId) => {
  return (dispatch) => {
    const host = "http://localhost:8000/arguments/?element=" + bigpictureId;
    fetch(host)
      .then(res => res.json())
      .then(res => {
        for(let i=0; i < res["results"].length; ++i)
          dispatch(addArgument(res["results"][i]));
      })
  }
}

export const getResources = (bigpictureId) => {
  return (dispatch) => {
    const host = "http://localhost:8000/resources/?element=" + bigpictureId;
    fetch(host)
      .then(res => res.json())
      .then(res => {
        for(let i=0; i < res["results"].length; ++i)
          dispatch(addResource(res["results"][i]));
      })
  }
}

export const getBigPicture = (id) => {
  return (dispatch) => {
    const host = "http://localhost:8000/bigpictures/" + id + "?format=json";
    fetch(host)
      .then(res => res.json())
      .then(res => {
        dispatch(addBigPicture(res));
      })
  }
}

export const deleteBigPicture = (id) => {
  return (dispatch) => {
    const host = "http://localhost:8000/bigpictures/" + id + "/?format=json";
    fetch(host, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
    .then(res => {
      if (res.status == 204) {
        dispatch({
          type: DELETE_BIG_PICTURE,
          id
        })
      }
    })
  }
}


export const deleteArgument = (id) => {
  return (dispatch) => {
    const host = "http://localhost:8000/arguments/" + id + "/?format=json";
    fetch(host, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
    .then(res => {
      if (res.status == 204) {
        dispatch({
          type: DELETE_ARGUMENT,
          id
        })
      }
    })
  }
}