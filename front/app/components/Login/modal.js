import { connect } from 'react-redux'
import { login } from '../../actions/api'

import NewActionsButtons from '../Buttons/newtoolbar'
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
          <div className="level is-mobile action-buttons">
            <div className="level-left"/>
            <div className="level-right">
              <div className="creating-button level cancel is-mobile" onClick={() => setActive(false)}>
                <span className="level-item text is-narrow">Annuler</span>
              </div>
              <div className="creating-button level publish is-mobile" onClick={onClick}>
                <span className="level-item text is-narrow">S'authentifier</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  username: state.get("user").username
})

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => { dispatch(login(credentials)) }
})

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalLook)

export default LoginModal
