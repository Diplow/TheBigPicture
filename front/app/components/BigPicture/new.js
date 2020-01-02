
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
import * as cst from '../../constants'
import "./style.scss"


const NewBigPictureLook = ({ parent, data, setData }) => {
  if (data == null)
    return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newBigPicture-modal">
      {kindField(data, edit, parent)}
      {titleField(data, edit)}
      {contentField(data, edit)}
    </div>
  )
}

NewBigPictureLook.propTypes = {
  data: PropTypes.object,
  parent: PropTypes.object,
  setData: PropTypes.func
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

const kindField = (data, edit, parent) => {
  if (data.kind == cst.SUBJECT)
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

const titleField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Titre</p>
      <input
        className="input tbp-modal"
        type="text"
        name="title"
        value={data.title}
        onChange={edit}
        placeholder="Titre" />
    </div>
  )
}

const contentField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Contenu</p>
      <textarea
        className="textarea tbp-modal"
        name="body"
        value={data.body}
        onChange={edit}
        placeholder="Contenu" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
  	parent: state.get("bigpictures").find(elt => elt.id == ownProps.data.parent)
  }
}

const NewBigPicture = connect(mapStateToProps)(NewBigPictureLook)

export default NewBigPicture
