
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import HomeBreadcrumb from './home'
import CategoryBreadcrumb from './category'
import BigPictureBreadcrumb from './bigpicture'
import UserBreadcrumb from './user'

import * as cst from '../../constants'
import './style.scss'


const BreadcrumbLook = ({ bigPicture, subject, bigPictureId, categoryLabel, userId }) => (
  <nav className="breadcrumb is-left" aria-label="breadcrumbs">
    <ul>
      <HomeBreadcrumb />
      <UserBreadcrumb userId={userId} />
      <CategoryBreadcrumb label={categoryLabel || bigPicture && (subject && subject.tags || cst.ALL_CATEGORY)} />
      <BigPictureBreadcrumb bigPictureId={bigPictureId} depth={1} />
    </ul>
  </nav>
)

const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find((elt) => elt.id == ownProps.bigPictureId)
  return {
    bigPicture,
    subject: bigPicture && bigPicture.subject ? state.get("bigpictures").find((elt) => elt.id == bigPicture.subject) : bigPicture
  }
}

const Breadcrumb = connect(mapStateToProps)(BreadcrumbLook)

export default Breadcrumb
