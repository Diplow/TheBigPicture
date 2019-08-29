import { connect } from 'react-redux'
import { patchBigPicture, postBigPicture, deleteBigPicture } from '../../actions/index'
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
    },
  	del: (bigPicture) => {
      if (bigPicture.id != undefined)
        dispatch(deleteBigPicture(bigPicture.id))
    }
  }
}

const BigPictureModal = connect(mapStateToProps, mapDispatchToProps)(BigPictureModalLook)

export default BigPictureModal
