import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteBigPicture } from '../../actions/index'
import Hashtags from '../Hashtags'
import "./style.scss"


class BigPicturePreviewLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data,
      showDetails,
      deleteBigPicture
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
    return (
	  <div className="bp-container media container">
      <div className="card">
        <header className="card-header level preview-item-level">
            <div className="level-left">
              <div className="container">
                <p
                  className="card-header-title"
                  onClick={this.toggleDetails}>
                  {this.props.data.title}
                </p>
              </div>
            </div>
            <div className="level-right">
              <Link 
                className="level-item is-shrink"
                to={"/bigPicture/" + this.props.data.id}>
                <span className="icon is-small"><i className="fas fa-search"></i></span>
              </Link>
              <a href="#" className="level-item">
                <span className="icon is-small"><i className="fas fa-star"></i></span>
              </a>
              <a
                href="#"
                className="level-item"
                onClick={() => {this.props.deleteBigPicture(this.props.data.id)}}>
                <span className="icon is-small"><i className="fas fa-trash"></i></span>
              </a>
            </div>
        </header>
        {
          this.state.showDetails ? (
            <div className="card-content">
              <div className="content">
                {this.props.data.body}
              </div>
              <Hashtags data={this.props.data.hashtags} />
            </div>
          ) : null
        }
      </div>
	  </div>
	)
  }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    "deleteBigPicture": (id) => { dispatch(deleteBigPicture(id)) }
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
