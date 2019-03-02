import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { postResource } from '../../actions/index'
import {} from '../../constants'
import "./style.scss"


class NewResourceLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      addResource,
      bigPicture,
      bigpicture
    } = this.props;
  }

  computeResource() {
    return {
      title: document.getElementById("NewResourceTitle").value,
      body: document.getElementById("NewResourceContent").value,
      resourceFor: this.props.bigpicture.id
    }
  }

  render() {
    return (
      <div>
        <input
          id="NewResourceTitle"
          className="input"
          type="text"
          placeholder="Titre de la ressource" />
        <textarea
          id="NewResourceContent"
          className="textarea"
          placeholder="Contenu de la ressource" /> 
        <div className="control">
          <button
            className="button is-dark"
            onClick={() => {this.props.addResource(this.computeResource())}}>
            Publier
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      "bigpicture": ownProps.bigPicture == 0 ? null : state.get("bigpictures").filter(elt => elt.id == ownProps.bigPicture)[0]
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "addResource": (resource) => { dispatch(postResource(resource)) }
  }
}

const NewResource = connect(mapStateToProps, mapDispatchToProps)(NewResourceLook)

export default NewResource
