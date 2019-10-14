import { connect } from 'react-redux'
import { deleteBigPicture } from '../../actions'
import { PreviewButtonLook, PreviewLinkLook } from './looks/previewbuttons'
import * as cst from '../../constants'


const LookButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user")
    }
  }
}

const EditButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user")
    }
  }
}

const RateButtonConfig = {
  mapStateToProps: (state) => {
    return {
      user: state.get("user")
    }
  }
}

export const LookButton = connect(LookButtonConfig.mapStateToProps)(PreviewLinkLook)
export const EditButton = connect(EditButtonConfig.mapStateToProps)(PreviewButtonLook)
export const RateButton = connect(RateButtonConfig.mapStateToProps)(PreviewButtonLook)
