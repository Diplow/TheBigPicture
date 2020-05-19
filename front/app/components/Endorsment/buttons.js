import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import EndorsmentModal from './modal'
import NewEndorsment from './new'

import './style.scss'


export const EndorsmentButton = ({ ratingId, reason, userId, bpId, rtgId, classname, icon }) => {
  const [init, setter] = useState({
    value: 0,
    target_id: ratingId,
    author_id: userId,
    bigpicture: bpId,
    rating: rtgId,
    reason: reason
  })

  return (
    <EditionModalButton
      init={init}
      setter={setter}
      classname={classname}
      icon={icon}
      EditionModal={EndorsmentModal}
      NewItem={NewEndorsment}
    />
  )
}
