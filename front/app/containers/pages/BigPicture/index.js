import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import BigPictureViewLook from './look'
import { getBigPicture, getSubjects, getRatings } from '../../../actions/index'
import { getPageFormatter } from '../../../components/List'
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
    getReferences: getPageFormatter(dispatch, getSubjects),
    getRatingsPage: getPageFormatter(dispatch, getRatings)
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
