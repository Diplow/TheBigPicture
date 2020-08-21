import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postRating, deleteRating, patchRating } from '../../actions'
import RadioButton from '../Buttons/radio'
import NewActionsButtons from '../Buttons/newtoolbar'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewRatingLook = (props) => {
  const {
    item,
    newItem,
    setNewItem,
    setShowNewItem,
    publish,
    trash
  } = props;
  return (
    <div className="vde child new-item">
      <textarea
        className="textarea vde-newrating"
        name="body"
        value={newItem.body}
        onChange={(e) => { setNewItem({ ...newItem, [e.target.name]: e.target.value })}}
        placeholder={cst.labels.NEW_REASON_PLACEHOLDER} />
      <NewActionsButtons
        publish={() => publish(newItem)}
        trash={() => trash(newItem)}
        discard={() => { setShowNewItem(false); setNewItem({ ...newItem, body: item && item.body || "" })}} />
    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  publish: (item) => { item.id ? dispatch(patchRating(item)) : dispatch(postRating(item)) },
  trash: (item) => { item.id ? dispatch(deleteRating(item.id)) : null }
})

const NewRating = connect(mapStateToProps, mapDispatchToProps)(NewRatingLook)

export default NewRating
