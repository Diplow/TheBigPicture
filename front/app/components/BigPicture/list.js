import React from 'react'
import { connect } from 'react-redux'
import { activateModal } from '../../actions/basics'
import BigPictureListLook from './looks/list'
import BigPicturePreview from './preview'
import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user").user,
    bigPictures: state.get("bigpictures").filter(ownProps.filter)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const BigPictureList = connect(mapStateToProps, mapDispatchToProps)(BigPictureListLook)

export default BigPictureList

export const createList = (title, bigPicture, filter, initNewBp, buttons) => {
  return (
    <BigPictureList
      title={title}
      bigPicture={bigPicture}
      filter={filter}
      initNewBp={initNewBp}
      buttons={buttons}
    />
  )
}