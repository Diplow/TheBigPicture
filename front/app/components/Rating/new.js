import React, { useState, useEffect } from 'react'

import Context from '../Context'

import * as cst from '../../constants'
import * as utils from '../utils'
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
      <Context bpId={data.target_bp} ratingId={data.target_rating} />
      { bodyField(data, edit) }
    </div>
  )
}

const contextField = (bigpicture, rating) => {
  if (target_bp)

  return (
    <ReactMarkdown source={bigPicture.body != "" ? bigPicture.body : "Ce contenu est vide pour le moment."} />
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
