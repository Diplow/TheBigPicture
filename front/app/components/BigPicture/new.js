import { connect } from 'react-redux'
import NewBigPictureLook from './looks/new'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {
  	bigPictures: state.get("bigpictures")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
