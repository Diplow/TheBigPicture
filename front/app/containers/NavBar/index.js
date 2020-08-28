
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import RightMenu from './rightmenu'

import Breadcrumb from '../Breadcrumb'

import * as cst from '../../constants'
import "./style.scss"


const NavBarLook = ({ pathname }) => {
  const path = pathname.split('/')
  const bigPictureId = path.length !== 3 || path[1] !== "bigpicture" ? null : path[2]
  const categoryLabel = path.length !== 3 || path[1] !== "categories" ? null : path[2]
  const userId = path.length !== 3 || path[1] !== "user" ? null : path[2]
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
        <Breadcrumb bigPictureId={bigPictureId} categoryLabel={categoryLabel} userId={userId} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  pathname: state.get("router").get("location").get("pathname")
})

const NavBar = connect(mapStateToProps)(NavBarLook)

export default NavBar
