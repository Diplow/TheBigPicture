import { connect } from 'react-redux'
import {
  getUser,
  follow,
  getOwnSubjects,
  getSubjects,
  getOwnRatings,
  getRatings,
  getSubscriptions } from '../../../actions'
import { getPageFormatter } from '../../../components/List'
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
  const addAuthorToOptions = (func) => {
    return (page, options, requestId) => {
      return func(page, { ...options, author: userId }, requestId)
    }
  }
  return {
    getUser: (id) => { dispatch(getUser(id)) },
    follow: (author) => { dispatch(follow(author, userId)) },
    getOwnSubjects: addAuthorToOptions(getPageFormatter(dispatch, getOwnSubjects)),
    getSubjects: addAuthorToOptions(getPageFormatter(dispatch, getSubjects)),
    getOwnRatings: addAuthorToOptions(getPageFormatter(dispatch, getOwnRatings)),
    getRatings: addAuthorToOptions(getPageFormatter(dispatch, getRatings)),
    getSubscriptions: addAuthorToOptions(getPageFormatter(dispatch, getSubscriptions))
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView