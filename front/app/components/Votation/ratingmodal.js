import { connect } from 'react-redux'
import { patchRating, postRating } from '../../actions/index'
import RatingModalLook from './looks/ratingmodal'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	post: (rating) => {
      rating.id == undefined
        ? dispatch(postRating(rating))
        : dispatch(patchRating(rating))
    }
  }
}

const RatingModal = connect(mapStateToProps, mapDispatchToProps)(RatingModalLook)

export default RatingModal
