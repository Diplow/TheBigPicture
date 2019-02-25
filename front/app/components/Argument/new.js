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
      pro,
      target,
      addArgument
    } = this.props;
  }

  computeArgument() {
    const prefix = (this.props.pro ? "pro" : "con")
    return {
      title: document.getElementById(prefix + "NewArgumentTitle").value,
      content: document.getElementById(prefix + "NewArgumentContent").value,
      target: this.props.target,
      nature: this.props.pro ? PRO_ARGUMENT : CON_ARGUMENT
    }
  }

  render() {
    return (
      <div>
        <input
          id={(this.props.pro ? "pro" : "con") + "NewArgumentTitle"}
          className="input"
          type="text"
          placeholder="Titre de l'argument" />
        <textarea
          id={(this.props.pro ? "pro" : "con") + "NewArgumentContent"}
          className="textarea"
          placeholder={"Contenu " + (this.props.pro ? "pour" : "contre")} /> 
        <div className="control">
          <button
            className="button is-dark"
            onClick={() => {this.props.addArgument(this.computeArgument())}}>
            Publier
          </button>
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
