import { connect } from 'react-redux'
import BigPictureViewLook from './look'
import { getBigPicture, getReferences } from '../../../actions/index'
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
    getReferences: (page, bpId) => { dispatch(getReferences(page, bpId)) }
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
