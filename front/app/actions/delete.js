import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"

const removeAction = {
	bigpictures: basics.removeBigPicture,
	ratings: basics.removeRating,
}


export const remove = (request) => {
  return (dispatch) => {
    const itemAPI = request.url.split("/")[0]
    const itemId = parseInt(request.url.split("/")[1])
    dispatch(basics.notification(notifications.itemDeletion[itemAPI]))
    dispatch(removeAction[itemAPI](itemId))
    dispatch(basics.processed(request))
  }
}
