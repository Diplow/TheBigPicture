import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NewRating from '../newrating'
import "./style.scss"


const RatingModalLook = ({ post, active, setActive, init }) => {

  const [rating, setRating] = useState(init)
  const [publish, setPublish] = useState(null)
  const headline = init.id == undefined ? "Nouveau vote" : "Modification du vote"

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{headline}</p>
          <button className="delete" onClick={() => setActive(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <NewRating rating={rating} setRating={setRating} />
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            <button
              className="button is-dark"
              onClick={() => { setActive(false); post(rating) }}>
              Voter
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

RatingModalLook.propTypes = {
  post: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  init: PropTypes.object.isRequired
}

export default RatingModalLook
