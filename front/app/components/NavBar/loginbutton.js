import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { activateModal } from '../../actions/basics'
import { logout } from '../../actions/api'
import * as cst from '../../constants'
import "./style.scss"


class LoginButtonLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      username,
      login,
      logout
    } = this.props;
  }

  render() {
    return (
      <div className="level-item">
        <p className="username">{this.props.username}</p>
        <span className="level-item is-shrink">
          {
            (this.props.username == cst.GUEST_NAME)
            ? <div className="button username logged-out" onClick={() => this.props.login()}><span className="icon is-small"><i className="fas fa-user"></i></span></div>
            : <div className="button username logged-in" onClick={() => this.props.logout()}><span className="icon is-small"><i className="fas fa-user"></i></span></div>
          }
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.get("user").user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => { dispatch(activateModal(cst.LOGIN_MODAL, {})) },
    logout: () => { dispatch(logout()) }
  }
}

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonLook)

export default LoginButton
