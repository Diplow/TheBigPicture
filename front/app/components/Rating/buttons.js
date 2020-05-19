import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import RatingModal from './modal'
import NewRating from './new'

import './style.scss'


export const RatingButton = ({ initRating, classname, icon }) => {
  const [init, setter] = useState(initRating)

  useEffect(() => {
    setter(initRating)
  }, [initRating])

  return (
    <EditionModalButton
      init={init}
      setter={setter}
      classname={classname}
      icon={icon}
      EditionModal={RatingModal}
      NewItem={NewRating}
    />
  )
}
