import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { deactivateModal } from '../../actions/basics'
import * as cst from '../../constants'
import { BigPictureModalLook } from '../BigPicture/modal'
import NewArgument from './new'
import "./style.scss"


const mapStateToProps = (state) => {
  const bigPicture = state.get("modals")[cst.CREATE_ARGUMENT_MODAL]
  return {
    headline: "Nouvel argument",
    bigPicture: bigPicture,
    active: bigPicture != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => { dispatch(deactivateModal(cst.CREATE_ARGUMENT_MODAL)) },
    body: (bigPicture) => (<NewArgument target={bigPicture}/>)
  }
}

const ArgumentModal = connect(mapStateToProps, mapDispatchToProps)(BigPictureModalLook)

export default ArgumentModal
