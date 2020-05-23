
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getSubscriptions } from '../../actions'
import SubscriptionPreview from './preview'
import List, { getPageFormatter } from '../List'
import * as cst from '../../constants'
import "./style.scss"


const SubscriptionListLook = (props) => {
  const {
    subscriptions,
    user,
    getSubscriptionsPage
  } = props

  const sort = (a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    if (aDate < bDate)
      return 1
    return aDate == bDate ? 0 : -1
  }

  return (
    <List
      items={subscriptions}
      container={(sub) => {
        return (
          <div key={`previewsub-${sub.id}`}>
            <SubscriptionPreview targetId={sub.target_id} />
          </div>
        )
      }}
      user={user}
      emptyMessage={cst.labels.USER_HAS_NO_SUBSCRIPTION}
      sortFunc={sort}
      count={user.subscriptionCount}
      getPage={(page, options, requestId) => getSubscriptionsPage(page, { ...options, author: user.id }, requestId)}
      loadFirstPage={false}
      title={cst.labels.SUBSCRIPTION_LIST_TITLE}
      margin={0}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    subscriptions: state.get("subscriptions").filter(item => item.target_id),
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubscriptionsPage: getPageFormatter(dispatch, getSubscriptions)
  }
}

const SubscriptionList = connect(mapStateToProps, mapDispatchToProps)(SubscriptionListLook)

export default SubscriptionList
