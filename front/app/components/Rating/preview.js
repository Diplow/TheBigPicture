import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthorIcon from '../User/authorIcon'
import * as cst from '../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useToggle } from '../utils/hooks'
import "./style.scss"
import { getRatings, getEndorsments } from '../../actions'
import { RatingButton } from './buttons'
import { EndorsmentButton } from '../Endorsment/buttons'
import EndorsmentPreview from '../Endorsment/preview'
import List, { getPageFormatter } from '../List'
import RadioButton from '../Buttons/radio'
import ReactMarkdown from 'react-markdown'
import RatingResults from './results'


const RatingPreviewLook = ({ rating, ratings, endorsments, user, ratingId, margin, getRatingsPage, getEndorsmentsPage }) => {
  const [showRatings, toggleRatings] = useToggle(false)
  const [showResults, toggleResults] = useToggle(false)
  const [showEndorsments, toggleEndorsments] = useToggle(false)

  if (!rating) return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}} key={`ratingpreview${ratingId}`}>
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
      { showEndorsments ? ratingEndorsments(rating, endorsments, margin, getEndorsmentsPage) : null }
      { showRatings ? ratingChildren(rating, ratings, margin, getRatingsPage) : null }
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
        { toggleButton(showResults, toggleResults, "fas fa-chart-bar") }
        { toggleButton(showEndorsments, toggleEndorsments, "fas fa-medal") }
        { toggleButton(showRatings, toggleRatings, "fas fa-comments") }
        { rateThisRatingButton(initRating) }
        { endorseThisRatingButton(rating, user.id) }
      </div>
    </div>
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
      icon="fas fa-edit" />
  )
}

const rateThisRatingButton = (initRating) => {
  return (
    <RatingButton
      initRating={initRating}
      classname="vde toolbar"
      icon="far fa-comment" />
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
      icon="fas fa-star" />
  )
}

const ratingChildren = (rating, children, parentMargin, getPage) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )
  
  const ratingsSort = (ratingA, ratingB) => {
    return ratingA.median >= ratingB.median ? 1 : -1
  }

  return (
    <List
      items={children}
      container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} margin={margin} />}
      emptyMessage={cst.RATING_HAS_NO_RATING}
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

const ratingEndorsments = (rating, endorsments, parentMargin, getPage) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )
  
  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} margin={margin} />}
      emptyMessage={cst.RATING_HAS_NO_ENDORSMENT}
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
