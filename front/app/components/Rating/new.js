import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postRating, deleteRating, patchRating } from '../../actions'
import RadioButton from '../Buttons/radio'

import { ReactComponent as PencilIcon } from '../../images/icons/pencil-solid.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewRatingLook = ({ newReason, setNewReason, setShowNewReason, publish, trash }) => {

  const publishButton =  (
    <div
      className="creating-button" onClick={() => {
        publish(newReason)
        setShowNewReason(false)
      }}>
      <PencilIcon className="level-item vde header-icon is-narrow icon-button" />
      <span className="level-item is-narrow">Publier</span>
    </div>
  )

  const trashButton = (
    <div
      className="creating-button" onClick={() => {
        setNewReason({ ...newReason, body: "" })
        trash(newReason)
        setShowNewReason(false)
      }}>
      <TrashIcon className="level-item vde header-icon is-narrow icon-button" />
      <span className="level-item is-narrow">Supprimer</span>
    </div>
  )


  const buttons = (
    <a className="level is-mobile publish-button">
      <div className="level-left"/>
      <div className="level-right">
        { publishButton }
        { trashButton }
      </div>
    </a>
  )

  return (
    <div className="vde child">
      <textarea
        className="textarea vde-newrating"
        name="body"
        value={newReason.body}
        onChange={(e) => { setNewReason({ ...newReason, [e.target.name]: e.target.value })}}
        placeholder={cst.labels.NEW_REASON_PLACEHOLDER} />
      { buttons }
    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  publish: (reason) => { reason.id ? dispatch(patchRating(reason)) : dispatch(postRating(reason)) },
  trash: (reason) => { reason.id ? dispatch(deleteRating(reason.id)) : null }
})

const NewRating = connect(mapStateToProps, mapDispatchToProps)(NewRatingLook)

export default NewRating
