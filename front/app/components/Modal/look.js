import React, { useState, useEffect } from 'react'
import "./style.scss"

import uuid from 'uuid/v4'


const EditionModalLook = (props) => {
  const { 
    post,
    del,
    title,
    construct,
    active,
    setActive,
    data
  } = props

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
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
            {
              del != undefined
              ? <button
                  className="button is-dark"
                  onClick={() => { setActive(false); del(data) }}>
                  {data.id == undefined ? "Annuler" : "Supprimer"}
                </button>
              : null
            }
          </div>
        </footer>
      </div>
    </div>
  )
}

export default EditionModalLook
