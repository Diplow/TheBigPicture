
export const SERVER_ADDR = document.domain == "localhost" ? "http://localhost:8000/api/" : "/api/"
export const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

export const GUEST_NAME = "Invité"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_BIG_PICTURE = "SET_BIG_PICTURE"

export const CREATE_BIG_PICTURE_MODAL = "CREATE_BIG_PICTURE_MODAL"
export const EDIT_BIG_PICTURE_MODAL = "EDIT_BIG_PICTURE_MODAL"
export const LOGIN_MODAL = "LOGIN_MODAL"

export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const POP_NOTIFICATION = "POP_NOTIFICATION"

export const SELECT_BIG_PICTURE = "SELECT_BIG_PICTURE"
export const ADD_BIG_PICTURE = "ADD_BIG_PICTURE"
export const ADD_ARGUMENT = "ADD_ARGUMENT"
export const ADD_RATING = "ADD_RATING"
export const ADD_RESOURCE = "ADD_RESOURCE"
export const ADD_USER = "ADD_USER"

export const DELETE_BIG_PICTURE = "DELETE_BIG_PICTURE"

export const ADD_REQUEST = "ADD_REQUEST"
export const REQUEST_CREATED = "REQUEST_CREATED"
export const REQUEST_DONE = "REQUEST_DONE"
export const REQUEST_PROCESSED = "REQUEST_PROCESSED"

export const SUBJECT = 1
export const PROBLEM = 2
export const SOLUTION = 3
export const RESOURCE = 4
export const ARGUMENT = 5
export const CLASSNAMES = {
    [PROBLEM]: "problem",
    [SOLUTION]: "solution",
    [RESOURCE]: "resource",
    [SUBJECT]: "subject"
}

export const SUBMARGIN = 10
