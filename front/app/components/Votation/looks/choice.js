import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import BigPicturePreview from '../../BigPicture/preview'
import * as cst from '../../../constants'
import "./style.scss"


const ChoiceLook = ({ bigPictureId, bigPicture, getBigPicture, votation }) => {

  useEffect(() => {
    if (bigPicture == null)
      getBigPicture(bigPictureId)
  })

  if (bigPicture == null)
    return null

  return (
    <div>
      <BigPicturePreview
        key={bigPictureId}
        data={bigPicture}
        buttons={["look", "edit", "rate"]}
        votation={votation}
      />
    </div>
  )
}

ChoiceLook.propTypes = {
  bigPictureId: PropTypes.number.isRequired,
  bigPicture: PropTypes.object,
  getBigPicture: PropTypes.func.isRequired,
  votation: PropTypes.object,
}

export default ChoiceLook
