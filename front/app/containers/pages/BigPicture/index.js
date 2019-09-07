import { connect } from 'react-redux'
import BigPictureViewLook from './look'
import { setBigPicture } from '../../../actions/index'
import * as cst from '../../../constants'
import "./style.scss"


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.get("user").user,
    bigPicture: state.get("bigpictures").find(elt => elt.id == ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBigPicture: (bpId, userId) => { dispatch(setBigPicture(bpId, userId)) }
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
