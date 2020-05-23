import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'

import { getRatings, getEndorsments } from '../../actions'

import AuthorIcon from '../User/authorIcon'

import { RatingButton } from './buttons'
import RatingResults from './results'

import { EndorsmentButton } from '../Endorsment/buttons'
import EndorsmentPreview from '../Endorsment/preview'
import endorsmentsSort from '../Endorsment/sort'

import List, { getPageFormatter } from '../List'

import RadioButton from '../Buttons/radio'
import LinkButton from '../Buttons/link'

import * as utils from '../utils'
import * as cst from '../../constants'
import "./style.scss"


const RatingPreviewLook = (props) => {
  const {
    rating,
    ratings,
    endorsments,
    user,
    ratingId,
    getRatingsPage,
    getEndorsmentsPage
  } = props

  const [showRatings, toggleRatings] = utils.hooks.useToggle(false)
  const [showResults, toggleResults] = utils.hooks.useToggle(false)
  const [showEndorsments, toggleEndorsments] = utils.hooks.useToggle(false)

  if (!rating) return null

  return (
    <div key={`ratingpreview${ratingId}`}>
      <div className="vde card reason">
        <header className="vde card-header level preview-item-level is-mobile">
          { ratingLeftLevel(rating) }
        </header>
        {
          toolBar({
            rating,
            ratings,
            endorsments,
            showRatings,
            toggleRatings,
            showResults,
            toggleResults,
            showEndorsments,
            toggleEndorsments,
            user
          })
        }
      </div>
      { showResults ? <RatingResults ratingId={rating.id} /> : null }
      { showEndorsments ? ratingEndorsments(rating, endorsments, getEndorsmentsPage) : null }
      { showRatings ? ratingChildren(rating, ratings, getRatingsPage) : null }
    </div>
  )
}

const ratingLeftLevel = (rating) => {
  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      <div className="vde card-content vde-preview-content">
        <div className="content">
          <ReactMarkdown source={rating.body} />
        </div>
      </div>
    </div>
  )
}

const toolBar = (props) => {
  const {
    rating,
    ratings,
    showRatings,
    toggleRatings,
    showResults,
    toggleResults,
    showEndorsments,
    toggleEndorsments,
    user
  } = props

  const initRating = {
    target_bp: null,
    target_rating: rating.id,
    author_id: user.id,
    body: "",
    subject: rating.subject
  }

  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{rating.date}</p>
      </div>
      <div className="level-right">
        { editRatingButton(rating) }
        { toggleButton(showResults, toggleResults, cst.icons.RESULT) }
        { toggleButton(showEndorsments, toggleEndorsments, cst.icons.ENDORSMENT_LIST) }
        { toggleButton(showRatings, toggleRatings, cst.icons.RATING_LIST) }
        { rateThisRatingButton(initRating) }
        { endorseThisRatingButton(rating, user.id) }
        { lookButton(rating) }
      </div>
    </div>
  )
}


const lookButton = (rating) => {
  return (
    <LinkButton
      icon={ cst.icons.SEARCH }
      to={`/subject/${rating.subject}/rating/${rating.id}`}
      classname="vde toolbar"
    />
  )
}


const toggleButton = (show, toggle, icon) => {
  return (
    <RadioButton
      classname="vde toolbar"
      isPushed={show}
      setIsPushed={toggle}
      icon={icon}
    />
  )
}

const editRatingButton = (initRating) => {
  return (
    <RatingButton
      initRating={initRating}
      classname="vde toolbar"
      icon={ cst.icons.EDIT } />
  )
}

const rateThisRatingButton = (initRating) => {
  return (
    <RatingButton
      initRating={initRating}
      classname="vde toolbar"
      icon={ cst.icons.RATING } />
  )
}

const endorseThisRatingButton = (rating, userId) => {
  return (
    <EndorsmentButton
      ratingId={rating.id}
      userId={userId}
      bpId={rating.target_bp}
      rtgId={rating.target_rating}
      reason={rating.body}
      classname="vde toolbar"
      icon={ cst.icons.ENDORSMENT } />
  )
}

const ratingChildren = (rating, children, getPage) => {
  
  const ratingsSort = (ratingA, ratingB) => {
    return ratingA.median >= ratingB.median ? 1 : -1
  }

  return (
    <List
      items={children}
      container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} />}
      emptyMessage={cst.labels.RATING_HAS_NO_RATING}
      sortFunc={ratingsSort}
      count={rating.ratingCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, rating: rating.id }, reqId)
        }
      }
      loadFirstPage={true}
    />
  )
}

const ratingEndorsments = (rating, endorsments, getPage) => {

  return (
    <List
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} />}
      emptyMessage={cst.labels.RATING_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={rating.endorsmentCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, rating: rating.id }, reqId)
        }
      }
      loadFirstPage={true}
    />
  )
}


const mapStateToProps = (state, ownProps) => {
  const thisrating = state.get("ratings").find(rating => rating.id == ownProps.ratingId)
  return {
    rating: thisrating,
    ratings: state.get("ratings").filter(rating => rating.target_rating == ownProps.ratingId),
    endorsments: thisrating ? state.get("endorsments").filter(endorsment => endorsment.rating == thisrating.id) : [],
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRatingsPage: getPageFormatter(dispatch, getRatings),
    getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
  }
}

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
