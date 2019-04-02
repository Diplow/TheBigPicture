import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { deactivateModal } from '../../actions/basics'
import * as cst from '../../constants'
import { BigPictureModalLook } from '../BigPicture/modal'
import NewResource from './new'
import "./style.scss"


const mapStateToProps = (state) => {
  const bigPicture = state.get("modals")[cst.CREATE_RESOURCE_MODAL]
  return {
  	bigPicture: bigPicture,
    "headline": "Nouvelle ressource",
    "active": bigPicture != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => { dispatch(deactivateModal(cst.CREATE_RESOURCE_MODAL)) },
    body: (bigPicture) => (<NewResource bigPicture={bigPicture}/>)
  }
}

const ResourceModal = connect(mapStateToProps, mapDispatchToProps)(BigPictureModalLook)

export default ResourceModal
