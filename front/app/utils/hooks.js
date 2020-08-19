
import React, { useState, useEffect } from 'react'

import { ReactComponent as EditIcon } from '../images/icons/edit.svg'


export const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggle = () => { setter(!toggleItem) } 
  return [toggleItem, toggle]
}

export const useEditionBuffer = (props) => {
  const {
    EditionWidget,
    initItem,
    item,
    user
  } = props;

  const [showNewItem, setShowNewItem] = useState(false)
  const [buffer, setBuffer] = useState(null)

  useEffect(() => {
    if (item) {
      setBuffer(initItem(item, user))
    }
  }, [item, user])

  const editButton = (
    <div className="vde header-button" onClick={() => setShowNewItem(!showNewItem)}>
      <EditIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const newItem = (
    <EditionWidget
      item={item}
      newItem={buffer}
      setNewItem={setBuffer} 
      setShowNewItem={setShowNewItem}
    />
  )

  return [editButton, newItem, showNewItem, setShowNewItem]
}