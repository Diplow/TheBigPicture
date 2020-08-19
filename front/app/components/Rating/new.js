import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postRating, deleteRating, patchRating } from '../../actions'
import RadioButton from '../Buttons/radio'
import NewActionsButtons from '../Buttons/newtoolbar'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewRatingLook = ({ reason, newReason, setNewReason, setShowNewReason, publish, trash }) => {

  return (
    <div className="vde child">
      <textarea
        className="textarea vde-newrating"
        name="body"
        value={newReason.body}
        onChange={(e) => { setNewReason({ ...newReason, [e.target.name]: e.target.value })}}
        placeholder={cst.labels.NEW_REASON_PLACEHOLDER} />
      <NewActionsButtons
        publish={() => publish(newReason)}
        trash={() => trash(newReason)}
        discard={() => { setShowNewReason(false); setNewReason({ ...newReason, body: reason && reason.body || "" })}} />
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
