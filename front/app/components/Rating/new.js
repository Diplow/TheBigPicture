import React, { useState, useEffect } from 'react'

import Context from '../Context'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"


const NewRating = (props) => {
  const {
    data,
    setData
  } = props;

  if (!data) return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newRatingModal">
      <Context title={cst.labels.CONTEXT_TITLE} bpId={data.target_bp} ratingId={data.target_rating} />
      { bodyField(data, edit) }
    </div>
  )
}

const bodyField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Raison</p>
      <textarea
        className="textarea tbp-modal"
        name="body"
        value={data.body}
        onChange={edit}
        placeholder="Raison..." />
    </div>
  )
}

export default NewRating
