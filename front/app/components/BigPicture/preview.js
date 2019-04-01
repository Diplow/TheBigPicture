import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteBigPicture } from '../../actions/index'
import { selectBigPicture } from '../../actions/basics'
import { TrashButton, LookButton } from './previewbuttons'
import "./style.scss"


export class BigPicturePreviewLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data,
      tileColor,
      showDetails
    } = this.props;
    this.state = {
      showDetails: this.props.showDetails
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  toggleDetails() {
    this.setState({"showDetails": !this.state.showDetails})
  }

  render() {
    if (this.props.bigPicture == null)
      return null
    return (
      <div style={{"backgroundColor": this.props.tileColor}} className="card">
        <header className="card-header level preview-item-level is-mobile">
          <div className="level-left">
            <p
              className="card-header-title"
              onClick={this.toggleDetails}>
              {this.props.bigPicture.title}
            </p>
          </div>
          <div className="level-right">
            <LookButton data={this.props.bigPicture} />
            <TrashButton data={this.props.bigPicture} />
          </div>
        </header>
        {
          this.state.showDetails ? (
            <div className="card-content">
              <div className="content">
                <ReactMarkdown source={this.props.bigPicture.body} />
              </div>
            </div>
          ) : null
        }
      </div>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const bigpictures = state.get("bigpictures").filter(bp => bp.id == ownProps.data.id)
  return {
    bigPicture: bigpictures.length == 1 ? bigpictures[0] : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
