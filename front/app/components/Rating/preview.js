import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthorIcon from '../User/authorIcon'
import * as cst from '../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useToggle } from '../utils/hooks'
import "./style.scss"
import { RatingButton, EditRatingButton } from './buttons'
import RadioButton from '../Buttons/radio'
import ReactMarkdown from 'react-markdown'


const RatingPreviewLook = ({ rating, ratings, ratingId, margin }) => {
  const [showRatings, toggleRatings] = useToggle(false)

  if (rating == undefined || rating == null)
    return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}}>
      <div className="reason card bp-tile">
        <header className="card-header level preview-item-level is-mobile">
          { ratingLeftLevel(rating) }
        </header>
        { toolBar(rating, ratings, showRatings, toggleRatings) }
      </div>
      { showRatings ? ratingChildren(rating, ratings, margin) : null }
    </div>
  )
}

RatingPreviewLook.propTypes = {
  ownRating: PropTypes.object, 
  rating: PropTypes.object,
  ratings: PropTypes.arrayOf(PropTypes.object),
  ratingId: PropTypes.number.isRequired, // used by connect
  ratingUser: PropTypes.number,
  margin: PropTypes.number, // leftmargin in case of rating / bp nesting
}

const staticStorage = "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/static/icons/"
const valueIcons = {
  0: "information.svg",
  1: "star-for-number-one.svg",
  2: "star-with-number-two.svg",
  3: "star-number-3.svg",
  4: "star-with-number-4.svg",
  5: "star-number-five.svg"
}

const ratingLeftLevel = (rating) => {
	return (
    <div className="level-left">
      <figure className="level-item image is-48x48">
        <img src={staticStorage + valueIcons[rating.value]} />
      </figure>
      <div className="card-content vde-preview-content">
        <div className="content">
          <ReactMarkdown source={rating.reason} />
        </div>
      </div>
    </div>
	)
}

const toolBar = (rating, ratings, showRatings, toggleRatings) => {
  const initRating = {
    value: 0,
    target_bp: null,
    target_rating: rating.id,
    reason: "",
    subject: rating.subject
  }
	return (
    <div className="level is-mobile vde-toolbar">
      <div className="level-left">
        <p>{rating.date}</p>
      </div>
      <div className="level-right">
        <EditRatingButton initRating={rating} />
        <RatingButton initRating={initRating} />
        { ratings.length != 0 ? <RadioButton
          classname={""}
          isPushed={showRatings}
          setIsPushed={toggleRatings}
          icon={"fas fa-comments"}
        /> : null }
      </div>
    </div>
	)
}

const ratingChildren = (rating, children, parentMargin) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )

  return (
    <div>
      {
        children.map(child => {
          return (
            <RatingPreview
              key={"preview"+child.id}
              ratingId={child.id}
              margin={margin}
            />
          )
        })
      }
      </div>
  )

}


const mapStateToProps = (state, ownProps) => {
  return {
    rating: state.get("ratings").find(rating => rating.id == ownProps.ratingId),
    ratings: state.get("ratings").filter(rating => rating.target_rating == ownProps.ratingId),
  }
}

const RatingPreview = connect(mapStateToProps)(RatingPreviewLook)

export default RatingPreview
