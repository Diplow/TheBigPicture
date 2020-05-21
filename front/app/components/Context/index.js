import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import * as cst from '../../constants'
import * as utils from '../utils'
import "./style.scss"


const ContextLook = ({ bigpicture, rating }) => {
  return (
    <div className="field">
      <p className="subtitle-modal">{cst.labels.CONTEXT_TITLE}</p>
      { bpContext(bigpicture) }
      { ratingContext(rating)}
    </div>
  )
}

const bpContext = (bp) => {
  const [show, toggle] = utils.hooks.useToggle(false)
  if (!bp) return null

  return (
    <div className="content">
      <p className="subtitle" onClick={toggle}>{bp.title}</p>
      { show ? <ReactMarkdown source={bp.body} /> : null }
    </div>
  )
}

const ratingContext = (rating) => {
  if (!rating) return null
  return <ReactMarkdown source={rating.body} />
}

const mapStateToProps = (state, ownProps) => {
  return {
    bigpicture: state.get("bigpictures").find(item => item.id == ownProps.bpId),
    rating: state.get("ratings").find(item => item.id == ownProps.ratingId)
  }
}

const Context = connect(mapStateToProps)(ContextLook)

export default Context
