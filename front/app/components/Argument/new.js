import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { postArgument } from '../../actions/index'
import { PRO_ARGUMENT, CON_ARGUMENT } from '../../constants'
import "./style.scss"


class NewArgumentLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      target,
      addArgument
    } = this.props;
    this.state = {
      nature: PRO_ARGUMENT
    }
  }

  computeArgument() {
    return {
      title: document.getElementById("NewArgumentTitle").value,
      body: document.getElementById("NewArgumentContent").value,
      resourceFor: this.props.target.id,
      nature: this.state.nature
    }
  }

  render() {
    return (
      <div>
        <input
          id="NewArgumentTitle"
          className="input tbp-modal"
          type="text"
          placeholder="Titre de l'argument" />
        <textarea
          id="NewArgumentContent"
          className="textarea tbp-modal"
          placeholder="Contenu" />
        <div className="level">
          <div className="level-left">
            <div className="buttons has-addons">
              <span
                className={"button " + (this.state.nature == PRO_ARGUMENT ? "is-selected is-success" : "")}
                onClick={() => this.setState({...this.state, nature: PRO_ARGUMENT})}>
                Pour
              </span>
              <span
                className={"button " + (this.state.nature == CON_ARGUMENT ? "is-selected is-danger" : "")}
                onClick={() => this.setState({...this.state, nature: CON_ARGUMENT})}>
                Contre
              </span>
            </div>
          </div>
          <div className="level-right">
            <div className="control">
              <button
                className="button is-dark"
                onClick={() => {this.props.addArgument(this.computeArgument())}}>
                Publier
              </button>
            </div>
          </div>
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
    "addArgument": (argument) => { dispatch(postArgument(argument)) }
  }
}

const NewArgument = connect(mapStateToProps, mapDispatchToProps)(NewArgumentLook)

export default NewArgument
