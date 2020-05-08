import { connect } from 'react-redux'
import {
  getUser,
  follow,
  getOwnSubjects,
  getSubjects,
  getOwnRatings,
  getRatings,
  getSubscriptions } from '../../../actions'
import UserViewLook from './look'
import uuid from 'uuid/v4'


const mapStateToProps = (state, ownProps) => {
  const user = state.get("users").find(user => user.id == ownProps.match.params.id)
  return {
    user,
    visitor: state.get("user"),
    ratings: user == null ? [] : state.get("ratings").filter(rating => rating.author == user.id),
    subscriptions: state.get("subscriptions")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = ownProps.match.params.id
  return {
    getUser: (id) => { dispatch(getUser(id)) },
    follow: (author) => { dispatch(follow(author, userId)) },
    getOwnSubjects: (page, options) => {
      const requestId = uuid()
      dispatch(getOwnSubjects(page, { ...options, author: userId }, requestId))
      return requestId
    },
    getSubjects: (page, options) => {
      const requestId = uuid()
      dispatch(getSubjects(page, { ...options, author: userId }, requestId))
      return requestId
    },
    getOwnRatings: (page, options) => {
      const requestId = uuid()
      dispatch(getOwnRatings(page, { ...options, author: userId }, requestId))
      return requestId
    },
    getRatings: (page, options) => {
      const requestId = uuid()
      dispatch(getRatings(page, { ...options, author: userId }, requestId))
      return requestId
    },
    getSubscriptions: (page, options) => {
      const requestId = uuid()
      dispatch(getSubscriptions(page, { ...options, author: userId }, requestId))
      return requestId
    }
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView