import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import RatingModal from './modal'
import NewRating from './new'

import './style.scss'


const RatingButtonLook = ({ initRating, classname, ownRating }) => {
  const [init, setter] = useState(ownRating == null ? initRating : ownRating)
  useEffect(() => {
    setter(ownRating == null ? initRating : ownRating)
  }, [initRating, ownRating])
  return (
    <EditionModalButton
      init={init}
      setter={setter}
      classname={classname}
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
        rating.author_id == state.get("user").id
        && ((rating.target_rating == ownProps.initRating.target_rating && ownProps.initRating.target_rating != undefined)
        || (rating.target_bp == ownProps.initRating.target_bp && ownProps.initRating.target_bp != undefined))
      )
    })
  }
}

export const RatingButton = connect(mapStateToProps)(RatingButtonLook)


export const EditRatingButton = ({ initRating, classname }) => {
  const [init, setter] = useState(initRating)
  useEffect(() => {
    setter(initRating)
  }, [initRating])
  return (
    <EditionModalButton
      init={init}
      setter={setter}
      classname={classname}
      icon={"fas fa-edit "}
      EditionModal={RatingModal}
      NewItem={NewRating}
    />
  )
}
