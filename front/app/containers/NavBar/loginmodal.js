import { connect } from 'react-redux'
import { login } from '../../actions/api'
import * as cst from '../../constants'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./style.scss"


const LoginModalLook = ({ active, setActive, login }) => {
  const [credentials, setCredentials] = useState({username:"", password:""})
  const edit = (e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value}) }
  const onClick = () => { setActive(false); login(credentials) }

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Authentification</p>
          <button
            className="delete"
            onClick={() => setActive(false)}
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <form className="form">
            <label className="label login-label" htmlFor="username">{cst.labels.USERNAME}</label>
            <input
              className="input vde" 
              type="text"
              name="username"
              value={credentials.username}
              onChange={edit}
            />
            <label className="label login-label" htmlFor="password">{cst.labels.PASSWORD}</label>
            <input
              className="input vde" 
              type="password"
              name="password"
              onKeyDown={(e) => { e.key === 'Enter' ? onClick() : null }}
              value={credentials.password}
              onChange={edit}
            />
            <label className="label login-inscription"> 
            <a href="https://api.vuedensemble.org/api/accounts/register" className="inscription-link">{cst.labels.INSCRIPTION_LINK}</a>
          </label>
          </form>
        </section>
        <footer className="modal-card-foot">
          <div
            className="button is-dark"
            onClick={onClick}>
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
