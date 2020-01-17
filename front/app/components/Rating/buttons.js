import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import RatingModal from './modal'
import NewRating from './new'


const RatingButtonLook = ({ initRating, ownRating }) => {
  return (
    <EditionModalButton
      init={ownRating == null ? initRating : ownRating}
      icon={"fas fa-star "}
      EditionModal={RatingModal}
      NewItem={NewRating}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ownRating: state.get("ratings").find(rating => {
      return (
        rating.author == state.get("user").id
        && ((rating.target_rating == ownProps.initRating.target_rating && ownProps.initRating.target_rating != undefined)
        || (rating.target_bp == ownProps.initRating.target_bp && ownProps.initRating.target_bp != undefined))
      )
    })
  }
}

export const RatingButton = connect(mapStateToProps)(RatingButtonLook)


export const EditRatingButton = ({ initRating }) => {
  return (
    <EditionModalButton
      init={initRating}
      icon={"fas fa-edit "}
      EditionModal={RatingModal}
      NewItem={NewRating}
    />
  )
}
