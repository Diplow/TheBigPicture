import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const NewRatingLook = (props) => {
  const {
    data,
    setData,
    target_bp
  } = props;

  if (data == null)
    return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newRatingModal">
      {starField(data, edit, target_bp)}
      {data.value != 6 ? reasonField(data, edit) : null}
    </div>
  )
}

NewRatingLook.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func
}

const starField = (data, edit, target_bp) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Évaluation</p>
        { stars(data, edit) }
        { explicit(data, edit, target_bp) }
    </div>
  )
}


const stars = (data, edit) => {
  const setV = (nb) => edit({ target: { name: "value", value: nb }})
  const nbStars = data.target_rating != null ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]

  const Star = ({ value, setValue, nb }) => {
    return (
      <div className={"level-item is-narrow" + (value >= nb ? " selected" : "")} onClick={() => {value == nb ? setValue(0) : setValue(nb)}}>
        <span className="tbp-star tbp-eval fa fa-star"/>
      </div>
    )
  }

  return (
    <div className="level star-level is-mobile">
      {
        nbStars.map(key => <Star key={`star-${key}-${data.id}`} value={data.value} setValue={setV} nb={key} />)
      }
    </div>
  )
}

const explicit = (data, edit, target_bp) => {
  const kind = target_bp == null ? cst.RATING : target_bp.kind
  return (<p>{EXPLICATIONS[kind][data.value]}</p>)
}

const reasonField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Raison</p>
      <textarea
        className="textarea tbp-modal"
        name="reason"
        value={data.reason}
        onChange={edit}
        placeholder="Explication de vote" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    target_bp: state.get("bigpictures").find(bp => bp.id == ownProps.data.target_bp)
  }
}

const NewRating = connect(mapStateToProps)(NewRatingLook)
export default NewRating
