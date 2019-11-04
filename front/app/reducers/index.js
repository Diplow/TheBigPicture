/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import bigpicturesReducer from './bigpictures'
import notificationsReducer from './notifications'
import userReducer from './user'
import usersReducer from './users'
import resultsReducer from './results'
import requestsReducer from './requests'
import globalReducer from './global'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    bigpictures: bigpicturesReducer,
    results: resultsReducer,
    user: userReducer,
    users: usersReducer,
    requests: requestsReducer,
    notifications: notificationsReducer,
    global: globalReducer,
    ...injectedReducers,
  });
}
