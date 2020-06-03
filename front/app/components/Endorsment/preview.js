import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import AuthorIcon from '../User/authorIcon'
import { useToggle } from '../../utils/hooks'
import { deleteEndorsment } from '../../actions/index'
import "./style.scss"
import * as cst from '../../constants'


const EndorsmentPreviewLook = (props) => {

  const {
    user,
    target,
    author,
    endorsment,
    cancel,
    margin
  } = props

  const [showReason, setShowReason] = useToggle(false)

  if (!endorsment || !target || !author) return null

  return (
    <div
      style={margin == undefined ? {} : {marginLeft:margin+"%"}}
      key={`endorsment-${endorsment.id}`}
      onClick={setShowReason}>
      <div className="vde card endorsment">
        <header className="vde card-header level preview-item-level is-mobile">
          { leftLevel(author, endorsment) }
          { rightLevel(endorsment, user, cancel) }
        </header>
        { endorsmentReason(showReason, target) }
      </div>
    </div>
  )
}

const leftLevel = (author, endorsment) => {
  return (
    <div style={{maxWidth:"95%"}} className="level-left">
      <AuthorIcon userId={author.id} showIcon={true} clickable={true}/>
      <p className="vde title">{author.username}</p>
    </div>
  )
}


const rightLevel = (endorsment, user) => {
  return (
    <div className="level-right">
      <figure className="vde rating-image level-item image is-48x48">
        <img src={cst.STATIC_STORAGE + cst.VALUE_ICONS[endorsment.value]} />
      </figure>
    </div>
  )
}

const endorsmentReason = (showReason, target) => {
  if (!showReason) return null

  return (
    <div className="vde card-content">
      <div className="content">
        <ReactMarkdown source={target.body} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const endorsment = state.get("endorsments").find(elt => elt.id == ownProps.endorsmentId)
  return {
    endorsment,
    user: state.get("user"),
    author: endorsment ? state.get("users").find(usr => usr.id == endorsment.author_id) : null,
    target: endorsment ? state.get("ratings").find(rating => rating.id == endorsment.target_id) : null
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: (endorsmentId) => { dispatch(deleteEndorsment(endorsmentId)) }
  }
}

const EndorsmentPreview = connect(mapStateToProps, mapDispatchToProps)(EndorsmentPreviewLook)

export default EndorsmentPreview
