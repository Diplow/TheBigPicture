
import React from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import * as cst from '../../constants'
import './style.scss'


const MAX_BREADCRUMB_LENGTH = 37

const shortenTitle = (title) => {
  if (title.length > MAX_BREADCRUMB_LENGTH + "...".length)
    return `${title.substring(0, MAX_BREADCRUMB_LENGTH)}...`
  return title
}


const BigPictureBreadcrumbLook = ({ bigPicture, parent, depth }) => {
  if (!bigPicture) return null

  console.log(bigPicture)
  const bpBreadCrumb = (
    <li>
      <Link to={`/bigpicture/${bigPicture.id}`}>      
        { shortenTitle(bigPicture.title) }
      </Link>
    </li>
  )

  if (!bigPicture.parent)
    return bpBreadCrumb

  if (depth > 2 && bigPicture.subject !== bigPicture.parent) {
    return (
      <React.Fragment>
        <BigPictureBreadcrumb bigPictureId={bigPicture.subject} depth={depth+1} />
        <li><span>{" ... "}</span></li>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BigPictureBreadcrumb bigPictureId={bigPicture.parent} depth={depth+1} />
      { bpBreadCrumb }
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find((elt) => elt.id == ownProps.bigPictureId)
  return {
    bigPicture,
    parent: bigPicture ? state.get("bigpictures").find((elt) => elt.id == bigPicture.parent) : null
  }
}

const BigPictureBreadcrumb = connect(mapStateToProps)(BigPictureBreadcrumbLook)

export default BigPictureBreadcrumb
