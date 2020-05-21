import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import RatingModal from './modal'
import NewRating from './new'

import * as cst from '../../constants'
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
      title={init.id ? cst.labels.EDIT_RATING_MODAL_TITLE : cst.labels.CREATE_RATING_MODAL_TITLE}
      icon={icon}
      EditionModal={RatingModal}
      NewItem={NewRating}
    />
  )
}
