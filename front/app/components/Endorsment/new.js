import React from 'react'

import ReactMarkdown from 'react-markdown'

import Context from '../Context'

import * as cst from '../../constants'
import * as utils from '../utils'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const NewEndorsment = (props) => {
  const {
    data,
    setData
  } = props;

  if (!data) return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newRatingModal">
      <Context title={cst.labels.CONTEXT_TITLE} bpId={data.bigpicture} ratingId={data.rating} />
      {starField(data, edit)}
      {reason(data)}
    </div>
  )
}

const reason = (data) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Raison</p>
      <ReactMarkdown source={data.reason} />
    </div>
  )
}

const starField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Évaluation</p>
      { stars(data, edit) }
      <p>{EXPLICATIONS[data.value]}</p>
    </div>
  )
}


const stars = (data, edit) => {
  const setV = (nb) => edit({ target: { name: "value", value: nb }})
  const nbStars = utils.range(1, cst.MAX_EVAL + 1)

  const Star = ({ value, setValue, nb }) => {
    return (
      <div
        className={`level-item is-narrow ${value >= nb ? "selected" : ""}`}
        onClick={() => {value == nb ? setValue(0) : setValue(nb)}}>
        <span className="tbp-star tbp-eval fa fa-star"/>
      </div>
    )
  }

  return (
    <div className="level star-level is-mobile">
      {
        nbStars.map(key =>
          <Star
            key={`star-${key}-${data.id}`}
            value={data.value}
            setValue={setV}
            nb={key}
          />
        )
      }
    </div>
  )
}

export default NewEndorsment
