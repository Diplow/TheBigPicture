import { connect } from 'react-redux'
import {
  getUser,
  follow,
  unfollow,
  getOwnSubjects,
  getSubjects,
  getOwnRatings,
  getRatings
} from '../../../actions'
import { getPageFormatter } from '../../../components/List'
import UserViewLook from './look'


const mapStateToProps = (state, ownProps) => {
  const user = state.get("users").find(user => user.id == ownProps.match.params.id)
  return {
    user,
    visitor: state.get("user"),
    ratings: !user ? [] : state.get("ratings").filter(rating => rating.author == user.id)
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
    unfollow: () => { dispatch(unfollow(userId)) },
    getOwnSubjects: addAuthorToOptions(getPageFormatter(dispatch, getOwnSubjects)),
    getSubjects: addAuthorToOptions(getPageFormatter(dispatch, getSubjects)),
    getOwnRatings: addAuthorToOptions(getPageFormatter(dispatch, getOwnRatings)),
    getRatings: addAuthorToOptions(getPageFormatter(dispatch, getRatings))
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView