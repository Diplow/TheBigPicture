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
    getOwnSubjects: (page) => { dispatch(getOwnSubjects(page, userId)) },
    getSubjects: (page) => { dispatch(getSubjects(page, userId)) },
    getOwnRatings: (page) => { dispatch(getOwnRatings(page, userId)) },
    getRatings: (page) => { dispatch(getRatings(page, userId)) }
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView