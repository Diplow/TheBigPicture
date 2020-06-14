
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import RightMenu from './rightmenu'

import * as cst from '../../constants'
import "./style.scss"


const NavBar = () => {

  return (
    <div className="vde section vde-navbar">
      <div className="container vde-navbar">
        <div className="vde-navbar level is-mobile">
          <div className="level-left">
            <Link className="brand title level-item" to="/" style={{"fontFamily":"Impact", "justifyContent": "left"}}>
              <figure className="level-item image is-96x96"><img src="https://vde-staticfiles.s3.amazonaws.com/media/profile_images/vde3.png"/></figure>
            </Link>
          </div>
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default NavBar
