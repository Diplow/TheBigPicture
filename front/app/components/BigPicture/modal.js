import { connect } from 'react-redux'
import React from 'react'
import { patchBigPicture, postBigPicture, deleteBigPicture } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import NewBigPicture from './new'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	post: (bigPicture) => {
      bigPicture.id == undefined
        ? dispatch(postBigPicture(bigPicture))
        : dispatch(patchBigPicture(bigPicture))
    },
  	del: (bigPicture) => {
      if (bigPicture.id != undefined)
        dispatch(deleteBigPicture(bigPicture.id))
    }
  }
}

const BigPictureModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default BigPictureModal
