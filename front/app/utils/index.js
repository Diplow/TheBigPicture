
import * as hooks from './hooks'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import * as cst from '../constants'
import './style.scss'

export { hooks }


export const range = (start, stop, step) => {
  if (typeof stop == 'undefined') {
    stop = start
    start = 0
  }

  if (typeof step == 'undefined') {
    step = 1
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  var result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result
}

export const removeEmptyKeys = (obj) => {
  let res = {}
  Object.keys(obj).forEach(
    (key) => {
      if ((obj[key] !== null && obj[key] !== "" && obj[key] !== undefined))
        res[key] = obj[key]
    }
  )
  return res
}

export const AbstractContent = ({ text }) => {
  const [show, setShow] = useState(false)
  const MAX_LENGTH_ABSTRACT = 220
  const TEXT_TOO_LONG = text.length > MAX_LENGTH_ABSTRACT

  if (!text) return null
  let source = text
  if (!show && TEXT_TOO_LONG)
    source = `${text.substr(0, MAX_LENGTH_ABSTRACT)}...`

  const showMore = (
    <p className="showmore is-narrow" onClick={() => setShow(!show)}>
      { show ? cst.labels.SEE_LESS : cst.labels.SEE_MORE }
    </p>
  )

  return (
    <div className="card-content">
      <div className="content">
        <ReactMarkdown source={source} />
        { TEXT_TOO_LONG ? showMore : null }
      </div>
    </div>
  )
}