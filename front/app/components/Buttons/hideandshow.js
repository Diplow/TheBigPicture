import React, { useState, useEffect } from 'react'
import './style.scss'


const HideAndShowButton = ({ hidden, setHidden }) => {
  return (
    <div>
      { figureIcon("fa-plus", hidden, setHidden) }
      { figureIcon("fa-minus", hidden, setHidden) }
    </div>
  )
}

const figureIcon = (icon, hidden, setHidden) => {
  if (hidden == (icon == "fa-minus"))
    return null
  return (
    <figure
      className="vde header-button level-item image is-24x24"
      onClick={() => setHidden(!hidden)}
    >
      <i className={`fas ${icon}`}></i>
    </figure>
  )
}

export default HideAndShowButton
