import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BigPicturePreview from '../preview'
import AddBigPictureButton from './addbutton'
import { useAuthorCheck } from './index'
import * as cst from '../../../constants'
import "./style.scss"


const BigPictureListLook = ({title, initNewBp, user, bigPictures, buttons }) => {
  const canCreate = user.username != cst.GUEST_NAME && initNewBp != undefined

  return (
    <div className="section">
      <div className="level arglist-level list-title">
        <h2 className="title level-item bplist-title is-narrow">{title}</h2>
        { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
      </div>
      <div className="content">
        {
          bigPictures.map((bp) => {
            return (
              <BigPicturePreview
                key={bp.id}
                data={bp}
                buttons={buttons}
              />
            )
          })
        }
      </div>
    </div>
  )
}

BigPictureListLook.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  bigPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  initNewBp: PropTypes.object,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default BigPictureListLook
