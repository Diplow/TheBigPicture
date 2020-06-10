
import { useState } from 'react'

export const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggle = () => { setter(!toggleItem) } 
  return [toggleItem, toggle]
}
