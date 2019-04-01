import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/api'


class LoginFormLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      handle_login
    } = this.props;

    this.state = {
      username: '',
      password: ''
    };

    this.handle_change = this.handle_change.bind(this);
  }

  handle_change(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div>
        <form className="form">
          <label className="label login-label" htmlFor="username">Username</label>
          <input
            className="input login-input" 
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          <label className="label login-label" htmlFor="password">Password</label>
          <input
            className="input login-input" 
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handle_change}
          />
          <div className="button login-button" onClick={() => this.props.handle_login(this.state)}>S'authentifier</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    "handle_login": (credentials) => { dispatch(login(credentials)) }
  }
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormLook)

export default LoginForm;
