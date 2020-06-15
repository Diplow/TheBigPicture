import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AuthorIcon from '../User/authorIcon'
import { unfollow } from '../../actions/index'
import "./style.scss"
import * as cst from '../../constants'


const SubscriptionPreviewLook = (props) => {

  const {
    user,
    target,
    subscription,
    unfollow
  } = props


  if (!subscription || !target) return null

  return (
    <div key={`subscriptionKey-${subscription.target_id}`}>
      <div className="vde card subscription">
        <header className="vde card-header level preview-item-level is-mobile">
          { leftLevel(target) }
          { rightLevel(subscription, unfollow) }
        </header>
      </div>
    </div>
  )
}

const leftLevel = (target) => (
  <div style={{maxWidth:"95%"}} className="level-left">
    <AuthorIcon userId={target.id} showIcon={true} clickable={true}/>
    <p className="vde title">{target.username}</p>
  </div>
)


const rightLevel = (subscription, unfollow) => (
  <div className="level-right">
    <div className="button tbp-radio title-button is-narrow unfollow">
      <a onClick={() => unfollow(subscription)}>
        <span className="icon is-small"><i className={cst.icons.DELETE_CROSS}></i></span>
      </a>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const subscription = state.get("subscriptions").find((elt) => elt.target_id == ownProps.targetId)
  return {
    user: state.get("user"),
    target: subscription ? state.get("users").find((usr) => usr.id == subscription.target_id) : null,
    subscription
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  // Some subscriptions are created on the fly without an ID to save db calls
  // Therefore, the target_id is also given to delete these subscriptions items
  unfollow: (subscription) => { dispatch(unfollow(subscription.target_id)) }
})

const SubscriptionPreview = connect(mapStateToProps, mapDispatchToProps)(SubscriptionPreviewLook)

export default SubscriptionPreview
