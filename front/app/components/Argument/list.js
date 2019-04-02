import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { activateModal } from '../../actions/basics'
import * as cst from '../../constants'
import Argument from './index'
import { BigPictureListLook } from '../BigPicture/list'
import "./style.scss"


const mapStateToProps = (state, ownProps) => {
  return {
    bigPictures: state.get("args").filter(arg => arg.resourceFor == ownProps.bigPicture.id),
    user: state.get("user").user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createBigPicture: () => (dispatch(activateModal(cst.CREATE_ARGUMENT_MODAL, ownProps.bigPicture))),
    itemGenerator: (argument) => (<Argument key={argument.id} data={argument} tileColor={argument.nature == cst.PRO_ARGUMENT ? "#93c47d" : "#dd7e6b"} showDetails={false} />),
    isAuthor: (user, bigPicture) => { return 0 != user.id }
  }
}

const ArgumentList = connect(mapStateToProps, mapDispatchToProps)(BigPictureListLook)

export default ArgumentList
