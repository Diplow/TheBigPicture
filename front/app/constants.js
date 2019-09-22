
export const SERVER_ADDR = document.domain == "localhost" ? "http://localhost:8000/api/" : "/api/"
export const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

export const GUEST_NAME = "Invité"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_BIG_PICTURE = "SET_BIG_PICTURE"

export const ACTIVATE_MODAL = "ACTIVATE_MODAL"
export const DEACTIVATE_MODAL = "DEACTIVATE_MODAL"
export const CREATE_BIG_PICTURE_MODAL = "CREATE_BIG_PICTURE_MODAL"
export const CREATE_VOTATION_MODAL = "CREATE_VOTATION_MODAL"
export const EDIT_BIG_PICTURE_MODAL = "EDIT_BIG_PICTURE_MODAL"
export const CREATE_ARGUMENT_MODAL = "CREATE_ARGUMENT_MODAL"
export const CREATE_RESOURCE_MODAL = "CREATE_RESOURCE_MODAL"
export const UPDATE_DRAFT = "UPDATE_DRAFT"
export const PUSH_CHOICE = "PUSH_CHOICE"
export const REMOVE_CHOICE = "REMOVE_CHOICE"
export const LOGIN_MODAL = "LOGIN_MODAL"

export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const POP_NOTIFICATION = "POP_NOTIFICATION"

export const SELECT_BIG_PICTURE = "SELECT_BIG_PICTURE"
export const UNSELECT_BIG_PICTURE = "UNSELECT_BIG_PICTURE"
export const UPDATE_BIG_PICTURE = "UPDATE_BIG_PICTURE"
export const ADD_BIG_PICTURE = "ADD_BIG_PICTURE"
export const ADD_ARGUMENT = "ADD_ARGUMENT"
export const ADD_VOTATION = "ADD_VOTATION"
export const ADD_RATING = "ADD_RATING"
export const ADD_RESOURCE = "ADD_RESOURCE"
export const ADD_RESOURCE_TO_BIG_PICTURE = "ADD_RESOURCE_TO_BIG_PICTURE"

export const DELETE_BIG_PICTURE = "DELETE_BIG_PICTURE"

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

export const PRO_ARGUMENT = 1
export const CON_ARGUMENT = 2

export const SUBMARGIN = 10