import { connect } from 'react-redux'
import { patchBigPicture, postBigPicture } from '../../actions/index'
import BigPictureModalLook from './looks/modal'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	post: (bigPicture) => {
      bigPicture.id == undefined
        ? dispatch(postBigPicture(bigPicture))
        : dispatch(patchBigPicture(bigPicture))
    }
  }
}

const BigPictureModal = connect(mapStateToProps, mapDispatchToProps)(BigPictureModalLook)

export default BigPictureModal
