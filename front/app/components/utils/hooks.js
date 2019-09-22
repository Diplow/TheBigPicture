
import { useState } from 'react'

export const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggleFunc = () => { setter(!toggleItem) } 
  return [toggleItem, toggleFunc]
}
