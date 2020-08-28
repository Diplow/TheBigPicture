import { connect } from 'react-redux'
import { getSubjects, getCategory } from '../../../actions/'

import CategoryPageLook from './look'

import { getPageFormatter } from '../../../components/List'
import uuid from 'uuid/v4'

import * as cst from '../../../constants'


const mapStateToProps = (state, ownProps) => ({
  user: state.get("user"),
  bigPictures: state.get("bigpictures").filter(
    (bp) => {
      return (
        bp.kind == cst.SUBJECT
        && bp.private == false
        && (
          ownProps.match.params.category == "all"
          || bp.tags.split(" ").indexOf(ownProps.match.params.category) !== -1
        )
      )
    }
  ),
  category: state.get("categories").find((cat) => cat.label == ownProps.match.params.category)
})

const mapDispatchToProps = (dispatch, state) => ({
  getBigPictures: getPageFormatter(dispatch, getSubjects),
  getCategory: (cat) => dispatch(getCategory(cat))
})

const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPageLook)

export default CategoryPage