import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteArgument } from '../../actions/index'
import { PRO_ARGUMENT, CON_ARGUMENT } from '../../constants'
import "./style.scss"


class ArgumentLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data,
      showDetails,
      deleteArgument
    } = this.props;

    this.state = {
      showDetails: this.props.showDetails
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({"showDetails": !this.state.showDetails})
  }

  render() {
    return (
      <div className={"card " + (this.props.data.nature == PRO_ARGUMENT ? "is-success" : "is-danger")}>
        <header className="card-header level preview-item-level is-mobile arg-lvl">
            <div className="level-left">
              <div className="container">
                <p
                  className="card-header-title arg-header-title"
                  onClick={this.toggleDetails}>
                  {this.props.data.title}
                </p>
              </div>
            </div>
            <div className="level-right">
              <Link 
                className="level-item is-shrink"
                to={"/bigpicture/" + this.props.data.id}>
                <span className="icon arg-buttons is-small"><i className="fas fa-search"></i></span>
              </Link>
              <a href="#" className="level-item">
                <span className="icon arg-buttons is-small"><i className="fas fa-star"></i></span>
              </a>
              <a
                href="#"
                className="level-item"
                onClick={() => {this.props.deleteArgument(this.props.data.id)}}>
                <span className="icon arg-buttons is-small"><i className="fas fa-trash"></i></span>
              </a>
            </div>
        </header>
        {
          this.state.showDetails ? (
            <div className="card-content">
              <div className="content is-small">
                {this.props.data.body}
              </div>
            </div>
          ) : null
        }
      </div>
	  )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    "deleteArgument": (id) => { dispatch(deleteArgument(id)) }
  }
}

const Argument = connect(mapStateToProps, mapDispatchToProps)(ArgumentLook)

export default Argument
