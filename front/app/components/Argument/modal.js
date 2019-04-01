import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { deactivateModal } from '../../actions/basics'
import * as cst from '../../constants'
import { BigPictureModalLook } from '../BigPicture/modal'
import NewArgument from './new'
import "./style.scss"


const mapStateToProps = (state) => {
  return {
    "headline": "Nouvel argument",
    "active": state.get("modals")[cst.CREATE_ARGUMENT_MODAL]
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
