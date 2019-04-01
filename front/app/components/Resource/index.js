import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteResource } from '../../actions/index'
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
  return {}
}

const Resource = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default Resource
