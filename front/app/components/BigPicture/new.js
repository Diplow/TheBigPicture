import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postBigPicture, deleteBigPicture, patchBigPicture } from '../../actions'
import RadioButton from '../Buttons/radio'
import NewActionsButtons from '../Buttons/newtoolbar'

import { ReactComponent as PencilIcon } from '../../images/icons/pencil-solid.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewBigPictureLook = (props) => {
  const { 
    item,
    newItem,
    setNewItem,
    setShowNewItem,
    publish,
    trash,
  } = props

  if (!newItem) return null

  const edit = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const header = () => (
    <header className="card-header level is-mobile">
      <div className="level-left">
        <input
          className="input vde-newrating"
          name="title"
          value={newItem.title}
          onChange={edit}
          placeholder={cst.labels.NEW_BP_TITLE_PLACEHOLDER} />
      </div>
    </header>
  )

  const content = () => (
    <div className="card-content">
      <div style={{padding: 0}} className="content">
        <textarea
          className="textarea vde-newrating"
          name="body"
          value={newItem.body}
          onChange={edit}
          placeholder={cst.labels.NEW_BP_ABSTRACT_PLACEHOLDER} />
      </div>
    </div>
  )

  const reference = () => (
    <header className="card-header level is-mobile">
      <div className="level-left">
        <input
          className="input vde-newrating"
          name="hyperlink_id"
          value={newItem.hyperlink_id}
          onChange={edit}
          placeholder={cst.labels.NEW_REFERENCE_PLACEHOLDER} />
      </div>
    </header>
  )

  return (
    <div className="vde child new-item">
      { header() }
      { content() }
      { reference() }
      <NewActionsButtons
        publish={() => publish(newItem)}
        trash={() => trash(newItem)}
        discard={
          () => {
            setShowNewItem(false);
            setNewItem({
              ...newItem,
              body: item && item.body || "",
              title: item && item.title || ""
            })
          }
        } />
    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  publish: (item) => { item.id ? dispatch(patchBigPicture(item)) : dispatch(postBigPicture(item)) },
  trash: (item) => { item.id ? dispatch(deleteBigPicture(item.id)) : null }
})

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
