import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import "./style.scss"

import uuid from 'uuid/v4'


const EditionModalLook = ({ post, del, construct, active, setActive, data }) => {
  const headline = data.id == undefined ? "Création de contenu" : "Modification de contenu"

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{headline}</p>
          <button className="delete" onClick={() => setActive(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          { construct }
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            <button
              className="button is-dark"
              onClick={() => { setActive(false); post(data) }}>
              Publier
            </button>
            <button
              className="button is-dark"
              onClick={() => { setActive(false); del(data) }}>
              {data.id == undefined ? "Annuler" : "Supprimer"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

EditionModalLook.propTypes = {
  post: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default EditionModalLook
