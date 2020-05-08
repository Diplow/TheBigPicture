import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import BigPictureViewLook from './look'
import { getBigPicture, getSubjects, getRatings } from '../../../actions/index'
import * as cst from '../../../constants'
import "./style.scss"


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user"),
    bigPicture: state.get("bigpictures").find(elt => elt.id == ownProps.match.params.bpId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
    getReferences: (page, bpId, options) => {
      const requestId = uuid()
      dispatch(getSubjects(page, { ...options, reference: bpId }, requestId))
      return requestId
    },
    getRatingsPage: (page, bpId, options) => {
      const requestId = uuid()
      dispatch(getRatings(page, { ...options, bigpicture: bpId }, requestId));
      return requestId
    }
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
