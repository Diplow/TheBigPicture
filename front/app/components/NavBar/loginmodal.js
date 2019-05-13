import { connect } from 'react-redux'
import { login } from '../../actions/api'
import * as cst from '../../constants'
import LoginModalLook from './looks/loginmodal'


const mapStateToProps = (state) => {
  return {
    username: state.get("user").user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => { dispatch(login(credentials)) }
  }
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalLook)

export default LoginModal
