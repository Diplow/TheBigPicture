
import { ADD_RESOURCE } from "../constants"

const resources = (state = [], action) => {
  switch (action.type) {
    case ADD_RESOURCE:
      const resource = action.resource;
      return [
        ...state.filter(element => element.id != resource.id),
        {
          id: resource.id,
          title: resource.title,
          body: resource.body,
          source: resource.source
        }
      ]
    default:
      return state
  }
}

export default resources
