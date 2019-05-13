import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import "./style.scss"


const NewBigPictureLook = ({ bigPictures, bp, setBP }) => {
  if (bp == null)
    return null

  const edit = (e) => {
    setBP({ ...bp, [e.target.name]: e.target.value})
  }
  const pushChoice = (choice) => {
    setBP({ ...bp, choices: [...bp.choices, choice]})
  }
  const removeChoice = (choice) => {
    setBP({ ...bp, choices: bp.choices.filter(c => c != choice)})
  }

  return (
    <div className="newBigPicture-modal">
      {titleField(bp, edit)}
      {contentField(bp, edit)}
      {natureField(bp, edit)}
      {choicesField(bigPictures, bp, pushChoice, removeChoice)}
    </div>
  )
}

NewBigPictureLook.propTypes = {
  bp: PropTypes.object,
  bigPictures: PropTypes.arrayOf(PropTypes.object),
  setBP: PropTypes.func
}

const titleField = (bp, edit) => {
  return (
    <div>
      <p className="subtitle-modal">Titre</p>
      <input
        className="input tbp-modal"
        type="text"
        name="title"
        value={bp.title}
        onChange={edit}
        placeholder="Titre de la vue" />
    </div>
  )
}

const contentField = (bp, edit) => {
  return (
    <div>
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

const natureField = (bp, edit) => {
  return (
    <div>
      <div className={bp.nature != undefined ? "level" : "level is-hidden"}>
        <div className="level-left">
          <div className="buttons has-addons">
            <span
              className={"button " + (bp.nature == cst.PRO_ARGUMENT ? "is-selected is-success" : "")}
              onClick={() => edit({target: {name: "nature", value: cst.PRO_ARGUMENT}})}>
              Pour
            </span>
            <span
              className={"button " + (bp.nature == cst.CON_ARGUMENT ? "is-selected is-danger" : "")}
              onClick={() => edit({target: {name: "nature", value: cst.CON_ARGUMENT}})}>
              Contre
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const choicesField = (bigPictures, bp, pushChoice, removeChoice) => {
  if (bigPictures == [] || bp.kind !== cst.VOTATION_CODE)
    return null
  const preview = (c, onclick) => {
    const b = bigPictures.find((bigPicture) => bigPicture.id == c)
    if (b == null)
      return null
    return (
      <div key={c} className="card">
        <header className="card-header level preview-item-level is-mobile">
          <div className="level-left">
            <p
              className="card-header-title"
              onClick={onclick}>
              {b.title}
            </p>
          </div>
        </header>
      </div>
    )
  }
  return (
    <div>
      <p className="subtitle-modal">Choix</p>
      <ul>
      {
        bp.choices.map(
          (choice) => { return preview(choice, () => removeChoice(choice)) }
        )
      }
      </ul>
      <p className="subtitle-modal">Vues</p>
      <ul>
        {
          bigPictures.filter(b => bp.choices.indexOf(b.id) == -1).map(
          (choice) => { return preview(choice.id, () => pushChoice(choice.id)) }
        )
      }
      </ul>
    </div>
  )

}

export default NewBigPictureLook
