
import React, { useState, useEffect } from 'react'

import { ReactComponent as EditIcon } from '../images/icons/edit.svg'
import { ReactComponent as PencilIcon } from '../images/icons/pencil-solid.svg'


export const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggle = () => { setter(!toggleItem) } 
  return [toggleItem, toggle]
}

export const useNewBuffer = (props) => {
  const {
    NewWidget,
    initItem,
    item,
    icon,
    user
  } = props;
  const Icon = icon || PencilIcon
  const [showNewItem, setShowNewItem] = useState(false)
  const [buffer, setBuffer] = useState(null)

  useEffect(() => {
    if (item) {
      setBuffer(initItem(item, user))
    }
  }, [item, user])

  if (!item)
    return [null, null, null, null]

  const newButton = (
    <div className="vde header-button" onClick={() => setShowNewItem(!showNewItem)}>
      <Icon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const newItem = (
    <NewWidget
      item={initItem(item, user)}
      newItem={buffer}
      setNewItem={setBuffer} 
      setShowNewItem={setShowNewItem}
    />
  )

  return [newButton, newItem, showNewItem, setShowNewItem]
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