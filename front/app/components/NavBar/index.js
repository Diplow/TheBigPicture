import { connect } from 'react-redux'

import { ReactComponent as NotifIcon } from '../../images/icons/notification.svg';
import { ReactComponent as SocialsIcon } from '../../images/icons/share.svg';
import { ReactComponent as UserIcon } from '../../images/icons/user.svg';

import React, { useState } from 'react'
import LoginButton from './loginbutton'
import LoginModal from './loginmodal'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


const NavBarLook = () => {

  return (
    <div className="section tbp-section navbar-section">
      <div className="container nav-container">
        <div id="navbar" className="tbp-section level tbp-nav-level is-mobile no-top-margin">
          <div className="level-left is-mobile">
            <Link className="brand title level-item" to="/" style={{"fontFamily":"Impact", "justifyContent": "left"}}>
              <figure className="level-item image is-96x96"><img src="https://vde-staticfiles.s3.amazonaws.com/media/profile_images/vde3.png"/></figure>
            </Link>
          </div>
          <div className="level-right is-mobile">
            <LoginButton />
          </div>
        </div>
      </div>

      <LoginModal/>
    </div>
  )
}

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
