import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'

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
    if (isActive != name) {
      setOpen(false)
    }
  }, [isActive])

  window.onclick = function(event) {
    if (isActive) {
      setOpen(false)
      setIsActive(null)
    }
  }

  return (
    <div className={`vde dropdown ${classname} ${open?"is_active":""}`}>
      <div className="vde dropdown-trigger">
        <a className="icon-button" onClick={() => setOpen(!open)}>
          {icon}
        </a>
      </div>
      <div className="vde dropdown-menu" role="menu">
        {open && children}
      </div>
    </div>
  );
}

export default DropDownButton
