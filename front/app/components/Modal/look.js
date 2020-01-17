import React, { useState } from 'react'
import PropTypes from 'prop-types'
import "./style.scss"


const EditionModalLook = ({ post, del, construct, active, setActive, initData }) => {

  const [item, setItem] = useState(initData)
  const [publish, setPublish] = useState(null)
  const headline = initData.id == undefined ? "Création de contenu" : "Modification de contenu"

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{headline}</p>
          <button className="delete" onClick={() => setActive(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          { construct(item, setItem) }
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            <button
              className="button is-dark"
              onClick={() => { setActive(false); post(item) }}>
              Publier
            </button>
            <button
              className="button is-dark"
              onClick={() => { setActive(false); del(item) }}>
              {initData.id == undefined ? "Annuler" : "Supprimer"}
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
  construct: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  initData: PropTypes.object.isRequired
}

export default EditionModalLook
