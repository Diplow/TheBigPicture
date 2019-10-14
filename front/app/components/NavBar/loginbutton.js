import { connect } from 'react-redux'
import { logout } from '../../actions/api'
import * as cst from '../../constants'
import LoginButtonLook from './looks/loginbutton'


const mapStateToProps = (state) => {
  return {
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout()) }
  }
}

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonLook)

export default LoginButton
