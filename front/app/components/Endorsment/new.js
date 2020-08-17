import React, { useState, useEffect } from 'react'

import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import { getRatings } from '../../actions'

import Context from '../Context'

import List, { getPageFormatter } from '../List'
import AuthorIcon from '../User/authorIcon'
import ratingsSort from '../Rating/sort'

import * as cst from '../../constants'
import { AbstractContent } from '../../utils'
import * as utils from '../../utils'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const NewEndorsmentLook = (props) => {
  const {
    data,
    setData,
    rating,
    bigpicture,
    reason,
  } = props;

  if (!data) return

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="newRatingModal">
      { bigpicture ? targetBp(bigpicture) : null }
      { rating ? targetRating(rating) : null }
      { starField(data, edit) }
      { reasonCard(reason) }
    </div>
  )
}

const targetBp = (bigPicture) => {
  const [show, setShow] = useState(false)
  const MAX_LENGTH_ABSTRACT = 200

  return (
    <div className="field">
      <p className="subtitle-modal">Je pense que...</p>
      <div class="vde card subject-preview">
        <header class="card-header level is-mobile">
          <div className="level-left">
            <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/>
            <p className="title">{bigPicture.title}</p>
          </div>
        </header>
      </div>
    </div>
  ) 
}

const targetRating = (rating) => {
  const [show, setShow] = useState(false)
  const MAX_LENGTH_ABSTRACT = 200

  return (
    <div className="field">
      <p className="subtitle-modal">Je pense que...</p>
      <div onClick={onclick} className="vde child reason">
        <AbstractContent text={rating.body} />
      </div>
    </div>
  ) 
}

const reasonCard = (rating) => {
  const [show, setShow] = useState(false)
  const MAX_LENGTH_ABSTRACT = 200

  return (
    <div className="field">
      <p className="subtitle-modal">Parce que...</p>
      <div onClick={onclick} className="vde child reason">
        <AbstractContent text={rating.body} />
      </div>
    </div>
  ) 
}

const starField = (data, edit) => (
  <div className="field">
    <p className="subtitle-modal">Est...</p>
    { stars(data, edit) }
    <p>{EXPLICATIONS[data.value]}</p>
  </div>
)

const stars = (data, edit) => {
  const setV = (nb) => edit({ target: { name: "value", value: nb }})
  const nbStars = utils.range(1, cst.MAX_EVAL + 1)

  const Star = ({ value, setValue, nb }) => (
    <div
      className={`level-item is-narrow ${value >= nb ? "selected" : ""}`}
      onClick={() => {value == nb ? setValue(0) : setValue(nb)}}>
      <span className="tbp-star tbp-eval fa fa-star"/>
    </div>
  )

  return (
    <div className="level star-level is-mobile">
      {
        nbStars.map((key) =>
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

const mapStateToProps = (state, ownProps) => ({
  bigpicture: state.get("bigpictures").find((bp) => bp.id == ownProps.data.bigpicture),
  rating: state.get("ratings").find((rtg) => rtg.id == ownProps.data.rating),
  reason: state.get("ratings").find((rtg) => rtg.id == ownProps.data.target_id),
})

const mapDispatchToProps = (dispatch) => ({
  getPage: getPageFormatter(dispatch, getRatings)
})

const NewEndorsment = connect(mapStateToProps, mapDispatchToProps)(NewEndorsmentLook)
export default NewEndorsment
