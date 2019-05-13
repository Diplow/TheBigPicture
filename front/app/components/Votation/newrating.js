import { connect } from 'react-redux'
import NewRatingLook from './looks/newrating'
import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => {
  return {
    args: state.get('bigpictures').filter(arg => arg.kind == cst.ARGUMENT_CODE && arg.resourceFor == ownProps.rating.target)
  }
}

const NewRating = connect(mapStateToProps)(NewRatingLook)

export default NewRating;
