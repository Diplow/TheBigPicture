import React from 'react'
import { connect } from 'react-redux'
import { activateModal } from '../../actions/basics'
import BigPictureListLook from './looks/list'
import BigPicturePreview from './preview'
import { getBigPicture } from '../../actions/index'
import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user"),
    bigPictures: state.get("bigpictures").filter(ownProps.filter),
    results: state.get("results"),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBigPicture: (bpId, userId) => { dispatch(getBigPicture(bpId, userId)) }
  }
}

const BigPictureList = connect(mapStateToProps, mapDispatchToProps)(BigPictureListLook)

export default BigPictureList

export const createList = (bigPicture, filter, buttons, showRatings, ratingUser, bigPictureIds) => {
  return (
    <BigPictureList
      bigPicture={bigPicture}
      filter={filter}
      buttons={buttons}
      showRatings={showRatings}
      ratingUser={ratingUser}
      bigPictureIds={bigPictureIds}
    />
  )
}