
// Server

export const STATIC_STORAGE = "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/static/icons/"
export const SERVER_ADDR = document.domain == "localhost" ? "http://localhost:8000/api/" : "https://api.vue-d-ensemble.fr/api/"
export const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

// Authentication

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

// Notifications

export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const POP_NOTIFICATION = "POP_NOTIFICATION"


// Ratings

export const RATING = 6
export const ADD_RATING = "ADD_RATING"
export const DELETE_RATING = "DELETE_RATING"
export const ADD_RATING_RESULTS = "ADD_RATING_RESULTS"
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

// pagination

export const PAGE_SIZE = 10.
export const SET_OWN_SUBJECT_COUNT = "SET_OWN_SUBJECT_COUNT"
export const SET_GLOBAL_SUBJECT_COUNT = "SET_GLOBAL_SUBJECT_COUNT"
export const SET_OWN_RATING_COUNT = "SET_OWN_RATING_COUNT"
export const SET_RATING_COUNT = "SET_RATING_COUNT"
export const SET_SUBSCRIPTION_COUNT = "SET_SUBSCRIPTION_COUNT"

// Big Pictures

export const ADD_BIG_PICTURE = "ADD_BIG_PICTURE"
export const ADD_BIG_PICTURE_RESULTS = "ADD_BIG_PICTURE_RESULTS"
export const ADD_BIG_PICTURE_REFERENCE = "ADD_BIG_PICTURE_REFERENCE"
export const DELETE_BIG_PICTURE = "DELETE_BIG_PICTURE"
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

export const ADD_USER = "ADD_USER"
export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION"
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION"
export const GUEST_NAME = "Invité"
export const GUEST_ID = 0

// Requests

export const ADD_REQUEST = "ADD_REQUEST"
export const REQUEST_CREATED = "REQUEST_CREATED"
export const REQUEST_ONGOING = "REQUEST_ONGOING"
export const REQUEST_DONE = "REQUEST_DONE"
export const REQUEST_PROCESSED = "REQUEST_PROCESSED"

// Others

export const BASE_MARGIN = 0
export const ADD_BUTTON = "ADD_BUTTON"
export const BACK_BUTTON = "BACK_BUTTON"
export const SUBMARGIN = 5

export const MSG_NO_SUBJECT = "Aucun sujet n'a encore été créé."
export const MSG_NO_REFERENCE = "Cette vue d'ensemble n'a encore été référencée nulle part sur VDE."
export const MSG_NO_REASON = "Cette vue d'ensemble n'a pas encore été raisonnée."
export const REFERENCE_LIST_TITLE = "Références"
export const REASON_LIST_TITLE = "Raisons"
export const USER_HAS_NO_SUBJECT = (username) => `Aucun sujet n'a encore été créé publiquement par ${username}`
export const CREATED_SUBJECT_LIST_TITLE = "Sujets créés"
export const CREATED_REASON_LIST_TITLE = "Raisons données"
export const USER_HAS_NO_REASON = (username) => `Aucune raison n'a encore été donnée publiquement par ${username}`
export const SUBSCRIPTION_LIST_TITLE = "Abonnements"
export const USER_HAS_NO_SUBSCRIPTION = "Vous ne vous êtes encore abonné à personne."
