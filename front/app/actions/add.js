import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"


export const add = (request) => {
  return (dispatch) => {
    const itemAPI = request.url.split("/")[0]
    const actions = {
    	"bigpictures": addBigPicture,
    	"subjects": addBigPicture,
    	"users": (dispatch, user) => { dispatch(basics.addUser(user)) },
    	"ratings": (dispatch, rating) => { dispatch(basics.addRating(rating)) },
    }
    const addAction = actions[itemAPI]
    if (addAction == undefined)
    	throw Error("unknown itemAPI " + itemAPI)

	if (request.response.results != undefined) {
		const results = request.response.results
		for (let i = 0; i < results.length; ++i) {
			addAction(dispatch, results[i])
		}
	}
	else {
		addAction(dispatch, request.response)
	}
    dispatch(basics.processed(request))
  }
}


const addBigPicture = (dispatch, bigPicture) => {
	for (let i = 0; i < bigPicture.ratings.length; ++i) {
	  const rating = bigPicture.ratings[i]
	  dispatch(basics.addRating(rating))
	}
	dispatch(basics.addBigPicture(bigPicture))
}
