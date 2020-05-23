import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import * as cst from '../../constants'
import * as utils from '../utils'
import "./style.scss"


const ContextLook = (props) => {
  const {
    bigpicture,
    rating,
    title,
    classname
  } = props

  return (
    <div>
      { title ? <p className="subtitle-modal">{title}</p> : null }
      <div className={`vde card tbp-description field ${classname}`}>
        <div className="vde card-content content">
          { bpContext(bigpicture) }
          { ratingContext(rating)}
        </div>
      </div>
    </div>
  )
}

const bpContext = (bp) => {
  const [show, toggle] = utils.hooks.useToggle(false)
  if (!bp) return null

  return (
    <div>
      <p className="subtitle" onClick={toggle}>{bp.title}</p>
      { show ? <ReactMarkdown source={bp.body} /> : null }
    </div>
  )
}

const ratingContext = (rating) => {
  if (!rating) return null
  return(
    <div>
      <Context classname="vde rating-page" ratingId={rating.target_rating} bpId={rating.target_bp} />
      <ReactMarkdown source={rating.body} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    bigpicture: state.get("bigpictures").find(item => item.id == ownProps.bpId),
    rating: state.get("ratings").find(item => item.id == ownProps.ratingId)
  }
}

const Context = connect(mapStateToProps)(ContextLook)

export default Context
