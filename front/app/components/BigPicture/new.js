import { connect } from 'react-redux'
import NewBigPictureLook from './looks/new'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {
  	bigPictures: state.get("bigpictures").filter((bp) => bp.kind == cst.BIGPICTURE_CODE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
