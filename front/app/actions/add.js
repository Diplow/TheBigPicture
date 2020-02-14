import * as cst from "../constants"
import * as notifications from "../constants/notifications"
import * as basics from "./basics"


export const add = (request) => {

  const addBigPicture = (dispatch, bigPicture) => {
  	  if (bigPicture.family != null) {
        for (let i = 0; i < bigPicture.family.length; ++i) {
		  const child = bigPicture.family[i]
		  if (child.id !== undefined) {
		    addBigPicture(dispatch, child)
		  }
	    }
	  }

	  if (bigPicture.author.id != undefined)
		dispatch(basics.addUser(bigPicture.author))
	  dispatch(basics.addBigPicture(bigPicture))
  }

  return (dispatch) => {
	if (request.id.split('-').indexOf("results") == -1) {
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

		if (request.response.results != undefined
			&& request.response.count != undefined) {
			const results = request.response.results
			for (let i = 0; i < results.length; ++i) {
				addAction(dispatch, results[i])
			}
		}
		else {
			addAction(dispatch, request.response)
		}
	}

    dispatch(basics.processed(request))
  }
}
