
import React, { useState, useEffect } from 'react'

import * as cst from '../../constants'
import "./style.scss"

const Tutorial = ({ page, identifier, title, paragraphs }) => {
  const [hidden, setHidden] = useState(true)

  const init_tutorial = (tuto) => {
    let res = {}
    Object.keys(cst.tutorial.TUTORIAL).forEach((page_key) => {
      res[page_key] = {}
      Object.keys(cst.tutorial.TUTORIAL[page_key]).forEach((paragraph_key) => {
        res[page_key][paragraph_key] = false
      })
    })
    return JSON.stringify(res)
  }

  useEffect(() => {
    const tutorial = JSON.parse(localStorage.getItem('tutorial') || init_tutorial(cst.tutorial.TUTORIAL))
    setHidden(tutorial[page][identifier])
  }, [])

  const onclick = () => {
    let tutorial = JSON.parse(localStorage.getItem('tutorial') || init_tutorial(cst.tutorial.TUTORIAL))
    tutorial[page][identifier] = true
    localStorage.setItem('tutorial', JSON.stringify(tutorial))
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div className="card vde-tuto">
      <div className="card-content">
        <div className="content">
          { title ? <p className="title is-4 is-spaced">{ title }</p> : null }
          { paragraphs.map((paragraph, index) => <p key={`tutorial-${page}-${identifier}-${index}`} className="subtitle is-6">{paragraph}<span className="subtitle is-6 vde-hide" onClick={onclick}>{" Ne plus afficher ce message du tutoriel."}</span></p>) }
        </div>
      </div>
    </div>
  )
}

export default Tutorial
