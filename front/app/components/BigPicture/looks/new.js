import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import * as cst from '../../../constants'
import "./style.scss"


const NewBigPictureLook = ({ bigPictures, bp, setBP }) => {
  if (bp == null)
    return null

  const parent = bigPictures.find(elt => elt.id == bp.parent)
  const edit = (e) => {
    setBP({ ...bp, [e.target.name]: e.target.value})
  }

  return (
    <div className="newBigPicture-modal">
      {kindField(bp, edit, parent)}
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

const radioButton = (value, onChange, label) => {
  return (
    <label className="radio">
      <input
        type="radio"
        name="kind"
        value={value}
        onChange={onChange} />
      {label}
    </label>
  )
}

const kindField = (bp, edit, parent) => {
  if (bp.kind == cst.SUBJECT)
    return null
  return (
    <div className="field">
      <p className="subtitle-modal">Type</p>
      <div className="control">
        { radioButton(cst.PROBLEM, edit, "Problème") }
        { parent != null && parent.kind != cst.RESOURCE && parent.kind != cst.SUBJECT ? radioButton(cst.SOLUTION, edit, "Solution") : null }
        { radioButton(cst.RESOURCE, edit, "Ressource") }
      </div>
    </div>
  )
}

const titleField = (bp, edit) => {
  return (
    <div className="field">
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
    <div className="field">
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
