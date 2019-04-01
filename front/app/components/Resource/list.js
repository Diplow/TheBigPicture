
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { activateModal } from '../../actions/basics'
import * as cst from '../../constants'
import Resource from './index'
import { BigPictureListLook } from '../BigPicture/list'
import "./style.scss"


const mapStateToProps = (state, ownProps) => {
  return {
    "bigPicture": state.get("bigpictures").filter(bp => bp.id == ownProps.bigPicture.id)[0],
    "user": state.get("user").user,
    "bigPictures": state.get("bigpictures").filter(resource => !resource.isArg && ownProps.bigPicture.id == resource.resourceFor)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "createBigPicture": () => (dispatch(activateModal(cst.CREATE_RESOURCE_MODAL))),
    "itemGenerator": (resource) => (<Resource key={resource.id} data={resource} showDetails={false} />),
    "isAuthor": (user, bigPicture) => { return bigPicture.author == user.id }
  }
}

const ResourceList = connect(mapStateToProps, mapDispatchToProps)(BigPictureListLook)

export default ResourceList
