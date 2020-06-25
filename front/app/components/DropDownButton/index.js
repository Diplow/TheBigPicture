import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import uuid from 'uuid/v4'
import './style.scss'


const DropDownButton = (props) => {
  const {
    icon,
    children,
    name,
    setIsActive,
    isActive,
    classname
  } = props

  // convoluted stuff to handle closing dropdown correctly... #FIXME
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open == true) {
      setIsActive(name)
    }
    else {
      if (isActive == name)
        setIsActive(null)
    }
  }, [open])

  useEffect(() => {
    if (isActive !== name) {
      setOpen(false)
    }
  }, [isActive])

  // more convoluted stuff to handle closing dropdown correctly... #FIXME
  const id = uuid().split('-').join('')
  window.vdeDropdowns = { ...window.vdeDropdowns, [id]: [name, setOpen, isActive] }
  window.onclick = (event) => {
    const ids = Object.keys(window.vdeDropdowns)
    for (let i=0; i < ids.length; ++i) {
      const dropdownId = ids[i]
      const [dropdownName, dropdownSetOpen, dropdownIsActive] = window.vdeDropdowns[dropdownId]
      const button = document.getElementById(dropdownId)
      if (!button)
        delete window.vdeDropdowns[dropdownId]
      if (button && dropdownIsActive == dropdownName) {
        dropdownSetOpen(false)
      }
    }
  }

  return (
    <div className={`vde dropdown ${classname} ${open?"is_active":""}`}>
      <div className="vde dropdown-trigger">
        <a id={id} className="icon-button" onClick={() => { setOpen(!open) }}>
          {icon}
        </a>
      </div>
      <div className="vde dropdown-menu" role="menu">
        {open && children}
      </div>
    </div>
  )
}

export default DropDownButton
