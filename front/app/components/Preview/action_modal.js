import React, { useState, useEffect } from 'react'

import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const useModalAction = (props) => {
  const {
    label,
    icon,
    modal,
    item,
    user,
    setActiveModal,
    hidden
  } = props

  // This is the format taken as input by dropdownItem
  const menu = {
    leftIcon: icon,
    name: label,
    onClick: () => setActiveModal(true)
  }

  if (hidden) return null

  return [modal(item, user), menu]
}

export default useModalAction
