import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteArgument } from '../../actions/index'
import { BigPicturePreviewLook } from '../BigPicture/preview'
import * as cst from '../../constants'
import "./style.scss"


const mapStateToProps = (state, ownProps) => {
  const bigpictures = state.get("bigpictures").filter(bp => bp.id == ownProps.data.id)
  return {
    bigPicture: bigpictures.length == 1 ? bigpictures[0] : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "deleteBigPicture": (id) => { console.log("lololo");dispatch(deleteArgument(id)) },
    "selectBigPicture": (id) => { dispatch(selectBigPicture(id)) }
  }
}

const Argument = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default Argument
