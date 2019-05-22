import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import BigPicturePreview from '../preview'
import AddBigPictureButton from './addbutton'
import { useAuthorCheck } from './index'
import * as cst from '../../../constants'
import "./style.scss"


const BigPictureListLook = ({title, initNewBp, user, bigPictures, buttons }) => {
  const canCreate = user.username != cst.GUEST_NAME && initNewBp != undefined
  const pageSize = 5.
  const [pagination, page] = usePagination(bigPictures, pageSize)

  return (
    <div className="section">
      <div className="level is-mobile">
        <div className="level-left">
          <h2 className="title">{title}</h2>
        </div>
        <div className="level-right">
          { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
        </div>
      </div>
      { pagination }
      <div>
        {
          page.map((bp) => {
            return (
              <BigPicturePreview
                key={bp.id}
                bpId={bp.id}
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
