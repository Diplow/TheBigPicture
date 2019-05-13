import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import Choice from '../../../components/Votation/choice'
import BigPictureContent from '../../../components/BigPicture'
import "./style.scss"


const BigPictureViewLook = ({ user, match, bigPicture, setBigPicture }) => {

  useEffect(() => {
    if (bigPicture == null)
      setBigPicture(match.params.id)
  })

  if (bigPicture == null)
    return null

  return (
    <div className="container tbp-section">
      <div key={bigPicture.id}>
        <BigPictureContent data={bigPicture} />
        { choiceList(bigPicture) }
        { resourceList(bigPicture) }
        { argList(bigPicture) }
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  setBigPicture: PropTypes.func.isRequired
}

const resourceList = (bigPicture) => {
  const title = "Ressources"
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.BIGPICTURE_CODE
      && bp.resourceFor == bigPicture.id
      && bp.kind !== cst.ARGUMENT_CODE
    )
  }
  const initNewBp = {
    title:"Nouvelle ressource",
    resourceFor:bigPicture.id,
    kind: cst.BIGPICTURE_CODE
  }
  const buttons = ["look", "edit"]
  return createList(title, bigPicture, bpFilter, initNewBp, buttons)
}

const argList = (bigPicture) => {
  const title = "Raisons"
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.ARGUMENT_CODE
      && bp.resourceFor == bigPicture.id
    )
  }
  const initNewBp = {
    title: "Nouvelle raison",
    resourceFor: bigPicture.id,
    nature: cst.PRO_ARGUMENT,
    kind: cst.ARGUMENT_CODE
  }
  const buttons = ["look", "edit"]
  return createList(title, bigPicture, bpFilter, initNewBp, buttons)
}

const choiceList = (bigPicture) => {
  if (bigPicture.kind != cst.VOTATION_CODE)
    return null

  return (
    <div>
      <h2 className="title">Choix</h2>
      {
        bigPicture.choices.map((choice) => {
          return <Choice
            key={choice}
            bigPictureId={choice}
            votation={bigPicture} />
        })
      }
    </div>
  )
}

export default BigPictureViewLook
