import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {} from '../../actions/index'
import {} from '../../constants'
import NewResource from '../Resource/new'
import "./style.scss"


class ResourceLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      resourceId,
      bigpicture,
      resource
    } = this.props;
  }



  render() {
    if (this.props.resourceId == 0) {
      return (<NewResource bigPicture={this.props.bigpicture} />)
    }
    else {
      return (
          <article className="resource-tile tile is-child is-12 notification is-success">
            <p className="title is-size-5">{this.props.resource.title}</p>
            <div className="content">
              {this.props.resource.body}
            </div>
          </article>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    "resource": state.get("resources").filter(elt => elt.id == ownProps.resourceId)[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Resource = connect(mapStateToProps, mapDispatchToProps)(ResourceLook)

export default Resource
