import { connect } from 'react-redux'

import {
  getRating,
  getRatings,
  getEndorsments
} from '../../../actions/index'

import RatingViewLook from './look'
import { getPageFormatter } from '../../../components/List'

import * as cst from '../../../constants'


const mapStateToProps = (state, ownProps) => {
  const rating = state.get("ratings").find(elt => elt.id == ownProps.match.params.ratingId)
  return {
    rating,
    ratings: state.get("ratings").filter(elt => elt.target_rating == rating.id),
    user: state.get("user"),
    endorsments: state.get("endorsments").filter(elt => elt.rating == rating.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRating: (ratingId) => { dispatch(getRating(ratingId)) },
    getRatingsPage: getPageFormatter(dispatch, getRatings),
    getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
  }
}

const RatingView = connect(mapStateToProps, mapDispatchToProps)(RatingViewLook)

export default RatingView
