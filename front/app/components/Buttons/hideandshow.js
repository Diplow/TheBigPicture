import React, { useState, useEffect } from 'react'
import * as cst from '../../constants'
import './style.scss'


const HideAndShowButton = ({ hidden, setHidden }) => (
  <div>
    { figureIcon(cst.icons.PLUS, hidden, setHidden) }
    { figureIcon(cst.icons.MINUS, hidden, setHidden) }
  </div>
)

const figureIcon = (icon, hidden, setHidden) => {
  if (hidden === (icon === cst.icons.MINUS))
    return null
  return (
    <figure
      className="vde header-button level-item image"
      onClick={() => setHidden(!hidden)}
    >
      <i className={icon}></i>
    </figure>
  )
}

export default HideAndShowButton
