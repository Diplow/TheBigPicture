import { connect } from 'react-redux'
import BigPictureContentLook from './looks'
import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => {
  return {
    "user": state.get("user").user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const BigPictureContent = connect(mapStateToProps, mapDispatchToProps)(BigPictureContentLook)

export default BigPictureContent
