

export const set_or_update = (fieldName, item, oldItem, defaultValue) => {
  if (item[fieldName] !== undefined) return item[fieldName]
  if (oldItem && oldItem[fieldName] !== undefined) return oldItem[fieldName]
  return defaultValue
}

export const add_item_to_set = (state, itemId, fieldSet, setItemId) => {
  const old = state.find((element) => element.id == itemId)
  if (!old && itemId == setItemId) {
    return [
      ...state,
      { id: itemId, references: [itemId] }
    ]
  }
  if (!old) return state
  return [
    ...state.filter((element) => element.id != itemId),
    {
      ...old,
      [fieldSet]: !old[fieldSet] ? [setItemId] : [...old[fieldSet].filter((ref) => ref != setItemId), setItemId]
    }
  ]
}

export const update_item = (state, itemId, updates) => {
  const old = state.find((element) => element.id == itemId)
  if (!old) return state
  return [
    ...state.filter((element) => element.id != itemId),
    {
      ...old,
      ...updates
    }
  ]
}
