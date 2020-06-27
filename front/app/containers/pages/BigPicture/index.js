import { connect } from 'react-redux'

import {
  getBigPicture,
  getSubjects,
  getRatings,
  getEndorsments
} from '../../../actions/index'

import BigPictureViewLook from './look'
import { getPageFormatter } from '../../../components/List'

import * as cst from '../../../constants'


const mapStateToProps = (state, ownProps) => ({
  user: state.get("user"),
  bigPicture: state.get("bigpictures").find((elt) => elt.id == ownProps.match.params.bpId),
  endorsments: state.get("endorsments").filter((elt) => elt.bigPicture == ownProps.match.params.bpId)
})

const mapDispatchToProps = (dispatch) => ({
  getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
  getReferences: getPageFormatter(dispatch, getSubjects),
  getRatingsPage: getPageFormatter(dispatch, getRatings),
  getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments),
  getLastBps: getPageFormatter(dispatch, getSubjects)
})

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
