import { connect } from 'react-redux'
import {
  getUser,
  getOwnSubjects,
  getSubjects,
  getOwnRatings,
  getRatings } from '../../../actions'
import UserViewLook from './look'


const mapStateToProps = (state, ownProps) => {
  const user = state.get("users").find(user => user.id == ownProps.match.params.id)
  return {
  	user,
  	visitor: state.get("user"),
  	ratings: user == null ? [] : state.get("ratings").filter(rating => rating.author == user.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = ownProps.match.params.id
  return {
    getUser: (id) => { dispatch(getUser(id)) },
    getOwnSubjects: (page, options) => { dispatch(getOwnSubjects(page, { ...options, author: userId })) },
    getSubjects: (page, options) => { dispatch(getSubjects(page, { ...options, author: userId })) },
    getOwnRatings: (page, options) => { dispatch(getOwnRatings(page, { ...options, author: userId })) },
    getRatings: (page, options) => { dispatch(getRatings(page, { ...options, author: userId })) }
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView