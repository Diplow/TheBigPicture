import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import "./style.scss"


const NewRatingLook = ({ args, rating, setRating }) => {
  if (rating == null)
    return null

  const edit = (e) => {
    setRating({ ...rating, value: parseInt(e.target.value)})
  }
  const pushArg = (reason) => {
    setRating({ ...rating, reasons: [...rating.reasons, reason]})
  }
  const removeArg = (reason) => {
    setRating({ ...rating, reasons: rating.reasons.filter(r => r != reason)})
  }

  return (
    <div>
      {valueField(rating, edit)}
      {reasons(rating, args, pushArg, removeArg)}
    </div>
  )
}

NewRatingLook.propTypes = {
  args: PropTypes.arrayOf(PropTypes.object),
  bigPicture: PropTypes.object,
  rating: PropTypes.object,
  setRating: PropTypes.func
}


const valueField = (rating, edit) => {
  return (
    <div>
      <p className="subtitle-modal">Valeur</p>
      <div className="select">
        <select onChange={edit}>
          <option value={0}>Non compris</option>
          <option value={1}>Désaccord total</option>
          <option value={2}>Désaccord mesuré</option>
          <option value={3}>Neutre</option>
          <option value={4}>Accord mesuré</option>
          <option value={5}>Accord total</option>
        </select>
      </div>
    </div>
  )
}


const reasons = (rating, args, pushArg, removeArg) => {
  const preview = (c, onclick) => {
    return (
      <div key={c} className="card">
        <header className="card-header level preview-item-level is-mobile">
          <div className="level-left">
            <p
              className="card-header-title"
              onClick={onclick}>
              {args.find((arg) => arg.id == c).title}
            </p>
          </div>
        </header>
      </div>
    )
  }
  return (
    <div>
      <p className="subtitle-modal">Raisonnement</p>
      <ul>
        {
          rating.reasons.map(
            (reason) => { return preview(reason, () => removeArg(reason)) }
          )
        }
      </ul>
      <p className="subtitle-modal">Arguments</p>
      <ul>
        {
          args.filter(b => rating.reasons.indexOf(b.id) == -1).map(
            (reason) => { return preview(reason.id, () => pushArg(reason.id)) }
          )
        }
      </ul>
    </div>
  )

}

export default NewRatingLook
