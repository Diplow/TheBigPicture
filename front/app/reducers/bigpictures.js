
import { ADD_BIG_PICTURE, ADD_RESOURCE, DELETE_BIG_PICTURE } from "../constants"

const bigpictures = (state = [], action) => {
  switch (action.type) {
    case ADD_BIG_PICTURE:
      const bp = action.bigpicture;
      return [
        ...state.filter(element => element.id != bp.id),
        {
          id: bp.id,
          title: bp.title,
          body: bp.body,
          img: bp.img,
          hashtags: bp.hashtags,
          resources: bp.resources,
          bigpictures: bp.bigpictures
        }
      ]
    case ADD_RESOURCE:
      console.log("REDUCER ADD RESOURCE BIGPICTURES, ", action.resource)
      const resource = action.resource;
      const bigpicturesIds = action.resource.bigpictures != undefined ? action.resource.bigpictures : [];
      const bigpictures = []
      for (let i=0; i < bigpicturesIds.length; ++i) {
        state.filter(elt => elt.id == bigpicturesIds[i])[0].resources.push(resource.id)
        bigpictures.push(state.filter(elt => elt.id == bigpicturesIds[i])[0])
      }
      const newState = state.filter(elt => bigpicturesIds.indexOf(elt.id) != -1)
      for (let i=0; i < bigpictures.length; ++i)
        newState.push(state.filter(elt => elt.id == bigpictures[i].id)[0])
      console.log(newState)
      return newState
    case DELETE_BIG_PICTURE:
      return state.filter(element => element.id != action.id)
    default:
      return state
  }
}

export default bigpictures