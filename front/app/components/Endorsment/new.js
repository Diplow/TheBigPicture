import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as cst from '../../constants'
import * as utils from '../utils'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const NewEndorsmentLook = (props) => {
  const {
    data,
    setData,
    bigpicture,
    rating
  } = props;

  if (!data) return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newRatingModal">
      {context(bigpicture, rating)}
      {starField(data, edit)}
      {reason(data)}
    </div>
  )
}

const context = (bigpicture, rating) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Cible</p>
      { bpContext(bigpicture) }
      { ratingContext(rating)}
    </div>
  )
}

const bpContext = (bp) => {
  if (!bp) return null
  return (
    <div className="content">
      <p className="subtitle">{bp.title}</p>
      <p className="content">{bp.body}</p>
    </div>
  )
}

const ratingContext = (rating) => {
  if (!rating) return null
  return (
    <p className="content">{rating.body}</p>
  )
}

const reason = (data) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Raison</p>
      <p className="content">{data.reason}</p>
    </div>
  )
}

const starField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Évaluation</p>
      { stars(data, edit) }
      <p>{EXPLICATIONS[data.value]}</p>
    </div>
  )
}


const stars = (data, edit) => {
  const setV = (nb) => edit({ target: { name: "value", value: nb }})
  const nbStars = utils.range(1, cst.MAX_EVAL + 1)

  const Star = ({ value, setValue, nb }) => {
    return (
      <div
        className={`level-item is-narrow ${value >= nb ? "selected" : ""}`}
        onClick={() => {value == nb ? setValue(0) : setValue(nb)}}>
        <span className="tbp-star tbp-eval fa fa-star"/>
      </div>
    )
  }

  return (
    <div className="level star-level is-mobile">
      {
        nbStars.map(key =>
          <Star
            key={`star-${key}-${data.id}`}
            value={data.value}
            setValue={setV}
            nb={key}
          />
        )
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    bigpicture: state.get("bigpictures").find(item => item.id == ownProps.data.bigpicture),
    rating: state.get("ratings").find(item => item.id == ownProps.data.rating)
  }
}

const NewEndorsment = connect(mapStateToProps)(NewEndorsmentLook)
export default NewEndorsment
