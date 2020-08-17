import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postBigPicture, deleteBigPicture, patchBigPicture } from '../../actions'
import RadioButton from '../Buttons/radio'

import { ReactComponent as PencilIcon } from '../../images/icons/pencil-solid.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewBigPictureLook = (props) => {
  const { 
    newBigPicture,
    setNewBigPicture,
    setShowNewBigPicture,
    publish,
    trash,
  } = props

  if (!newBigPicture) return null

  const edit = (e) => {
    setNewBigPicture({ ...newBigPicture, [e.target.name]: e.target.value })
  }

  const publishButton =  (
    <div
      className="creating-button" onClick={() => {
        publish(newBigPicture)
        setShowNewBigPicture(false)
      }}>
      <PencilIcon className="level-item vde header-icon is-narrow icon-button" />
      <span className="level-item is-narrow">Publier</span>
    </div>
  )

  const trashButton = (
    <div
      className="creating-button" onClick={() => {
        setNewBigPicture({ ...newBigPicture, title: "", body: "" })
        trash(newBigPicture)
        setShowNewBigPicture(false)
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

  const header = () => (
    <header className="card-header level is-mobile">
      <div className="level-left">
        <input
          className="input vde-newrating"
          name="title"
          value={newBigPicture.title}
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
          value={newBigPicture.body}
          onChange={edit}
          placeholder={cst.labels.NEW_BP_BODY_PLACEHOLDER} />
      </div>
    </div>
  )

  return (
    <div className="vde child">
      { header() }
      { content() }
      { buttons }
    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  publish: (bp) => { bp.id ? dispatch(patchBigPicture(bp)) : dispatch(postBigPicture(bp)) },
  trash: (bp) => { bp.id ? dispatch(deleteBigPicture(bp.id)) : null }
})

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
