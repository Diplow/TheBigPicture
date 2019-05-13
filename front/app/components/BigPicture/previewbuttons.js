import { connect } from 'react-redux'
import { deleteBigPicture } from '../../actions'
import { PreviewButtonLook, PreviewLinkLook } from './looks/previewbuttons'
import * as cst from '../../constants'


const LookButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user").user
    }
  }
}

const TrashButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user").user
    }
  },
  mapDispatchToProps: (dispatch) => {
    return {
      action: (bigPicture) => { dispatch(deleteBigPicture(bigPicture.id)) }
    }
  }
}

const EditButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user").user
    }
  }
}


const RateButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user").user
    }
  }
}

export const LookButton = connect(LookButtonConfig.mapStateToProps)(PreviewLinkLook)
export const TrashButton = connect(TrashButtonConfig.mapStateToProps, TrashButtonConfig.mapDispatchToProps)(PreviewButtonLook)
export const EditButton = connect(EditButtonConfig.mapStateToProps)(PreviewButtonLook)
export const RateButton = connect(RateButtonConfig.mapStateToProps)(PreviewButtonLook)
