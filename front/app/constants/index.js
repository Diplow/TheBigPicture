
export const SERVER_ADDR = document.domain == "localhost" ? "http://localhost:8000/api/" : "https://api.vue-d-ensemble.fr/api/"
export const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

export const GUEST_NAME = "Invité"
export const GUEST_ID = 0

export const BASE_MARGIN = 0

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const UPDATE_DRAFT = "UPDATE_DRAFT"
export const LOGIN_MODAL = "LOGIN_MODAL"

export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const POP_NOTIFICATION = "POP_NOTIFICATION"

export const ADD_BIG_PICTURE = "ADD_BIG_PICTURE"
export const ADD_RATING = "ADD_RATING"
export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION"
export const ADD_BIG_PICTURE_RESULTS = "ADD_BIG_PICTURE_RESULTS"
export const ADD_BIG_PICTURE_REFERENCE = "ADD_BIG_PICTURE_REFERENCE"
export const DELETE_BIG_PICTURE = "DELETE_BIG_PICTURE"
export const DELETE_RATING = "DELETE_RATING"
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION"
export const ADD_RATING_RESULTS = "ADD_RATING_RESULTS"

// pagination
export const PAGE_SIZE = 10.
export const SET_OWN_SUBJECT_COUNT = "SET_OWN_SUBJECT_COUNT"
export const SET_GLOBAL_SUBJECT_COUNT = "SET_GLOBAL_SUBJECT_COUNT"
export const SET_OWN_RATING_COUNT = "SET_OWN_RATING_COUNT"
export const SET_SUBSCRIPTION_COUNT = "SET_SUBSCRIPTION_COUNT"

export const SUBJECT = 1
export const PROBLEM = 2
export const SOLUTION = 3
export const RESOURCE = 4
export const RATING = 6

export const CLASSNAMES = {
    [PROBLEM]: "problem",
    [SOLUTION]: "solution",
    [RESOURCE]: "resource",
    [SUBJECT]: "subject",
}

export const ADD_BUTTON = "ADD_BUTTON"
export const BACK_BUTTON = "BACK_BUTTON"

export const SUBMARGIN = 5

export const ADD_USER = "ADD_USER"
export const ADD_REQUEST = "ADD_REQUEST"
export const REQUEST_CREATED = "REQUEST_CREATED"
export const REQUEST_ONGOING = "REQUEST_ONGOING"
export const REQUEST_DONE = "REQUEST_DONE"
export const REQUEST_PROCESSED = "REQUEST_PROCESSED"
