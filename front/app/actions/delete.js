import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"


export const remove = (request) => {
  return (dispatch) => {
    const itemAPI = request.url.split("/")[0]
    const itemId = parseInt(request.url.split("/")[1])
    dispatch(basics.notification(notifications.itemDeletion[itemAPI]))
    dispatch(basics.removeBigPicture(itemId))
    dispatch(basics.processed(request))
  }
}
