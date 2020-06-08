
import * as explications from './explications'
import * as notifications from './notifications'
import * as actions from './actions'
import * as labels from './labels'
import * as icons from './icons'

export { actions }
export { labels }
export { icons }
export { explications }
export { notifications }

// Server
export const STATIC_STORAGE = "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/static/icons/"
export const SERVER_ADDR = document.domain == "localhost" ? "http://localhost:8000/api/" : "https://api.vuedensemble.org/api/"
export const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]
export const PAGE_SIZE = 10. // This value has to match the server value
export const TOKEN_DURATION = 7 // token expire after 7 days. This value has to match the server value

// Ratings
export const RATING = 6
export const MAX_EVAL = 5
export const ENDORSMENT_VALUE = MAX_EVAL + 1
export const VALUE_ICONS = {
  0: "information.svg",
  1: "star-for-number-one.svg",
  2: "star-with-number-two.svg",
  3: "star-number-3.svg",
  4: "star-with-number-4.svg",
  5: "star-number-five.svg"
}


// Big Pictures
export const SUBJECT = 1
export const PROBLEM = 2
export const SOLUTION = 3
export const RESOURCE = 4
export const CLASSNAMES = {
    [PROBLEM]: "problem",
    [SOLUTION]: "solution",
    [RESOURCE]: "resource",
    [SUBJECT]: "subject",
}


// Users
export const GUEST_ID = 0


// Others
export const BASE_MARGIN = 0
export const ADD_BUTTON = "ADD_BUTTON"
export const BACK_BUTTON = "BACK_BUTTON"
export const SUBMARGIN = 5

