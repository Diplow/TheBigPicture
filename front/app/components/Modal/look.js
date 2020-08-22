import React, { useState, useEffect } from 'react'
import "./style.scss"

import NewActionsButtons from '../Buttons/newtoolbar'
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

  if (!data) return null

  return (
    <div className={"modal" + (active ? " is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p  style={{maxWidth: "100%"}} className="modal-card-title">{title}</p>
          <button className="delete" onClick={() => setActive(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          { active ? construct : null }
        </section>
        <footer className="modal-card-foot" style={{padding: 0}}>
          <NewActionsButtons
            publish={() => { setActive(false); post(data) }}
            trash={data.id ? () => { setActive(false); del(data) } : null}
            discard={data.id ? null : () => { setActive(false) }} />
        </footer>
      </div>
    </div>
  )
}

export default EditionModalLook
