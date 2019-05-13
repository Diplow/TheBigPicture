import { connect } from 'react-redux'
import NavBarLook from './looks'


const mapStateToProps = (state, ownProps) => {
  return {
    username: state.get("user").username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarLook)

export default NavBar
