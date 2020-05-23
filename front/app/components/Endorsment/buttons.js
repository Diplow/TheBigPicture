import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditionModalButton from '../Buttons/modal'
import EndorsmentModal from './modal'
import NewEndorsment from './new'

import * as cst from '../../constants'
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
      title={cst.labels.CREATE_ENDORSMENT_MODAL_TITLE}
      icon={icon}
      EditionModal={EndorsmentModal}
      NewItem={NewEndorsment}
    />
  )
}
