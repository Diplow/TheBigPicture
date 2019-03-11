import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteResource } from '../../actions/index'
import {} from '../../constants'
import NewResource from '../Resource/new'
import "./style.scss"


class ResourceLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      resourceId,
      bigpicture,
      resource,
      deleteResource
    } = this.props;

    this.state = {
      showDetails: true
    }

    this.toggleDetails = this.toggleDetails.bind(this)
  }

  toggleDetails() {
    this.setState({"showDetails": !this.state.showDetails})
  }

  render() {
    if (this.props.resourceId == 0) {
      return (<NewResource bigPicture={this.props.bigpicture} />)
    }
    else {
      return (
        <div className="card is-info">
          <header className="card-header level preview-item-level is-mobile arg-lvl">
            <div className="level-left">
              <div className="container">
                <p
                  className="card-header-title arg-header-title"
                  onClick={this.toggleDetails}>
                  {this.props.resource.title}
                </p>
              </div>
            </div>
            <div className="level-right">
              <Link 
                className="level-item is-shrink"
                to={"/bigpicture/" + this.props.resource.id}>
                <span className="icon arg-buttons is-small"><i className="fas fa-search"></i></span>
              </Link>
              <a href="#" className="level-item">
                <span className="icon arg-buttons is-small"><i className="fas fa-star"></i></span>
              </a>
              <a
                href="#"
                className="level-item"
                onClick={() => {this.props.deleteResource(this.props.resource.id)}}>
                <span className="icon arg-buttons is-small"><i className="fas fa-trash"></i></span>
              </a>
            </div>
          </header>
          {
            this.state.showDetails ? (
              <div className="card-content">
                <div className="content is-small">
                  <ReactMarkdown source={this.props.resource.body} />
                </div>
              </div>
            ) : null
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    "resource": state.get("bigpictures").filter(elt => elt.id == ownProps.resourceId)[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "deleteResource": (id) => { dispatch(deleteResource(id)) }
  }
}

const Resource = connect(mapStateToProps, mapDispatchToProps)(ResourceLook)

export default Resource
