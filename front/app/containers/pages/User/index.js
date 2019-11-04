import { connect } from 'react-redux'
import { getUser, getOwnSubjects, getRatedSubjects } from '../../../actions'
import UserViewLook from './look'


const mapStateToProps = (state, ownProps) => {
  const user = state.get("users").find(user => user.id == ownProps.match.params.id)
  return {
  	user,
  	visitor: state.get("user"),
  	ratings: user == null ? [] : state.get("results").filter(rating => rating.author == user.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = ownProps.match.params.id
  return {
    getUser: (id) => { dispatch(getUser(id)) },
    getOwnSubjects: (page) => { dispatch(getOwnSubjects(userId, page)) },
    getRatedSubjects: (page) => { dispatch(getRatedSubjects(userId, page)) }
  }
}

const UserView = connect(mapStateToProps, mapDispatchToProps)(UserViewLook)

export default UserView