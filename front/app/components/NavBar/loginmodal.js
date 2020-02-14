import { connect } from 'react-redux'
import { login } from '../../actions/api'
import * as cst from '../../constants'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./style.scss"


const LoginModalLook = ({ active, setActive, login }) => {
  const [credentials, setCredentials] = useState({username:"", password:""})
  const edit = (e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value}) }

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Identification</p>
          <button
            className="delete"
            onClick={() => setActive(false)}
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <form className="form">
            <label className="label login-label" htmlFor="username">Username</label>
            <input
              className="input tbp-modal" 
              type="text"
              name="username"
              value={credentials.username}
              onChange={edit}
            />
            <label className="label login-label" htmlFor="password">Password</label>
            <input
              className="input tbp-modal" 
              type="password"
              name="password"
              value={credentials.password}
              onChange={edit}
            />
            <label className="label login-inscription"> 
	          <a href="https://api.vue-d-ensemble.fr/api/accounts/register">Ou inscrivez-vous ici.</a>
	        </label>
          </form>
        </section>
        <footer className="modal-card-foot">
          <div
            className="button is-dark"
            onClick={() => { setActive(false); login(credentials) }}>
            S'authentifier
          </div>
        </footer>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.get("user").username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => { dispatch(login(credentials)) }
  }
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalLook)

export default LoginModal
