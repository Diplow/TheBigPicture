/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable'

import bigpicturesReducer from './bigpictures'
import notificationsReducer from './notifications'
import userReducer from './user'
import usersReducer from './users'
import ratingsReducer from './ratings'
import requestsReducer from './requests'
import globalReducer from './global'


const createReducer = (history) => combineReducers({
  router: connectRouter(history),
  bigpictures: bigpicturesReducer,
  ratings: ratingsReducer,
  user: userReducer,
  users: usersReducer,
  requests: requestsReducer,
  notifications: notificationsReducer,
  global: globalReducer,
});

export default createReducer
