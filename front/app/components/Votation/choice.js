import { connect } from 'react-redux'
import ChoiceLook from './looks/choice'
import { getBigPicture } from '../../actions'
import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => {
  return {
    bigPicture: state.get('bigpictures').find(bp => bp.id == ownProps.bigPictureId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBigPicture: (id) => { dispatch(getBigPicture(id)) }
  }
}

const Choice = connect(mapStateToProps, mapDispatchToProps)(ChoiceLook)

export default Choice;
