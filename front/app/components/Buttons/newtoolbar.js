import React, { useState, useEffect } from 'react'


import { ReactComponent as PencilIcon } from '../../images/icons/pencil-solid.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'
import { ReactComponent as CancelIcon } from '../../images/icons/cancel.svg'

import * as cst from '../../constants'
import "./style.scss"

const NewActionsButtons = (props) => {
  const {
    publish,
    trash,
    discard
  } = props;

  const publishButton = (
    <div
      className="creating-button level publish is-mobile" onClick={() => {
        publish()
        discard()
      }}>
      <PencilIcon className="level-item icon" />
      <span className="level-item text is-narrow">Publier</span>
    </div>
  )

  const trashButton = (
    <div
      className="creating-button level trash is-mobile" onClick={() => {
        trash()
        discard()
      }}>
      <TrashIcon className="level-item icon" />
      <span className="level-item text is-narrow">Supprimer</span>
    </div>
  )

  const discardButton = (
    <div
      className="creating-button level cancel is-mobile" onClick={() => {
        discard()
      }}>
      <CancelIcon className="level-item icon" />
      <span className="level-item text is-narrow">Annuler</span>
    </div>
  )

  return (
    <div className="level is-mobile action-buttons">
      <div className="level-left"/>
      <div className="level-right">
        { discard ? discardButton : null }
        { trash ? trashButton : null }
        { publish ? publishButton : null }
      </div>
    </div>
  )
}

export default NewActionsButtons
