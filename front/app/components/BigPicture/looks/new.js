import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import * as cst from '../../../constants'
import "./style.scss"


const NewBigPictureLook = ({ bigPictures, bp, setBP }) => {
  if (bp == null)
    return null

  const edit = (e) => {
    setBP({ ...bp, [e.target.name]: e.target.value})
  }

  return (
    <div className="newBigPicture-modal">
      {kindField(bp, edit)}
      {titleField(bp, edit)}
      {contentField(bp, edit)}
    </div>
  )
}

NewBigPictureLook.propTypes = {
  bp: PropTypes.object,
  bigPictures: PropTypes.arrayOf(PropTypes.object),
  setBP: PropTypes.func
}

const kindField = (bp, edit) => {
  if (bp.kind == cst.SUBJECT)
    return null
  return (
    <div className="control">
      <label className="radio">
        <input
          type="radio"
          name="kind"
          value={cst.PROBLEM}
          onChange={edit} />
        Problème
      </label>
      <label className="radio">
        <input
          type="radio"
          name="kind"
          value={cst.SOLUTION}
          onChange={edit} />
        Solution
      </label>
      <label className="radio">
        <input
          type="radio"
          name="kind"
          value={cst.RESOURCE}
          onChange={edit} />
        Ressource
      </label>
    </div>
  )
}

const titleField = (bp, edit) => {
  return (
    <div>
      <p className="subtitle-modal">Titre</p>
      <input
        className="input tbp-modal"
        type="text"
        name="title"
        value={bp.title}
        onChange={edit}
        placeholder="Titre" />
    </div>
  )
}

const contentField = (bp, edit) => {
  return (
    <div>
      <p className="subtitle-modal">Contenu</p>
      <textarea
        className="textarea tbp-modal"
        name="body"
        value={bp.body}
        onChange={edit}
        placeholder="Contenu" />
    </div>
  )
}

export default NewBigPictureLook
