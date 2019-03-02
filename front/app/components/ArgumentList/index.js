import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import {} from '../../constants'
import Argument from '../../components/Argument'
import NewArgument from '../../components/Argument/new'
import "./style.scss"


class ArgumentListLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture,
      args
    } = this.props;

    this.state = {
      createModal: false
    }
  }

  render() {
    return (
      <div className="column is-4 con-column">
        <div className="level arglist-level">
          <h2 className="title level-item arglist-title">Raisons</h2>
          <a href="#" onClick={() => this.setState({createModal: !this.state.createModal})} className="button level-item is-narrow">
            <span className="icon"><i className="fas fa-plus"></i></span>
          </a>
        </div>
        {
          this.props.args.map(arg => (
            <Argument
              key={arg.id}
              data={arg}
              showDetails={false} />
          ))
        }
        <div className={"modal" + (this.state.createModal ? " is-active" : "")}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Nouvel argument</p>
              <button className="delete" onClick={() => this.setState({...this.state, createModal: false})} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <NewArgument target={this.props.bigPicture.id}/>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    "args": state.get("args").filter(arg => arg.bigPicture == ownProps.bigPicture.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ArgumentList = connect(mapStateToProps, mapDispatchToProps)(ArgumentListLook)

export default ArgumentList
