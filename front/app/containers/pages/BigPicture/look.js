import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import BigPictureContent from '../../../components/BigPicture'
import { FullStackedBarChart } from '../../../components/Votation/looks/results'
import "./style.scss"


const BigPictureViewLook = ({ user, match, bigPicture, setBigPicture }) => {

  useEffect(() => {
    setBigPicture(match.params.id)
  }, [])

  if (bigPicture == null)
    return null

  return (
    <div className="container tbp-section">
      <div key={bigPicture.id}>
        <BigPictureContent data={bigPicture} />
        { choiceList(bigPicture) }
        { context(bigPicture) }
        <div className="is-divider"/>
        { resourceList(bigPicture) }
        <div className="is-divider"/>
        { argList(bigPicture) }
        { results(bigPicture) }
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  setBigPicture: PropTypes.func.isRequired
}

const context = (bigPicture) => {
  if (bigPicture.resourceFor == null)
    return null
  return (
    <div>
      <div className="is-divider"/>
      <h2 className="title">Contexte</h2>
      <BigPicturePreview
        bpId={bigPicture.resourceFor}
        buttons={["look"]} />
    </div>
  )
}

const resourceList = (bigPicture) => {
  const title = "Ressources"
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.BIGPICTURE_CODE
      && bp.resourceFor == bigPicture.id
      && bp.kind !== cst.ARGUMENT_CODE
      && (bigPicture.choices == null || bigPicture.choices.indexOf(bp.id) == -1)
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
  const buttons = ["look", "edit", "trash"]
  return createList(title, bigPicture, bpFilter, initNewBp, buttons)
}

const choiceList = (bigPicture) => {
  if (bigPicture.kind != cst.VOTATION_CODE)
    return null

  return (
    <div>
      <div className="is-divider"/>
      <h2 className="title">Choix</h2>
      {
        bigPicture.choices.map((choice) => {
          return (
            <BigPicturePreview
              key={choice}
              bpId={choice}
              buttons={["look", "edit", "rate"]}
              votation={bigPicture}
            />
          )
        })
      }
    </div>
  )
}

const VotationResult = (bigPicture) => {
  /*
    [{
      choice: 1,
      0: 52,
      1: 13,
      2: 24,
      3: 56,
      4: 25,
      5: 2
    },
    {
      choice: 2,
      0: 26,
      1: 22,
      2: 27,
      3: 89,
      4: 111,
      5: 49
    }]

    =>

    [
      [0, 1, 2, 3, 4, 5],
      [1, 51, 13, 24, 56, 25, 2],
      [2, 26, 22, 27, 89, 111, 49]
    ]
  */
  let data = [
    ["vote", "Non compris", "Désaccord total", "Désaccord mesuré", "Neutre", "Accord mesuré", "Accord total"],
  ]
  for (let i in bigPicture.results) {
    let d = bigPicture.results[i]
    data.push(["Choix " + String(++i), d[0], d[1], d[2], d[3], d[4], d[5]])
  }
  return (
    <FullStackedBarChart data={data} />
  )
} 

const results = (bigPicture) => {
  if (bigPicture.kind != cst.VOTATION_CODE)
    return null

  return (
    <div>
      <div className="is-divider"/>
      <h2 className="title">Résultats</h2>
      { VotationResult(bigPicture) }
    </div>
  )
}

export default BigPictureViewLook
