import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { deactivateModal } from '../../actions/basics'
import * as cst from '../../constants'
import LoginForm from './index'
import "./style.scss"


class LoginModalLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      active
    } = this.props;
  }


  render() {
    return (
      <div className={"modal" + (this.props.active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Identification</p>
            <button className="delete" onClick={() => this.props.close()} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <LoginForm/>
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(state.get("modals")[cst.LOGIN_MODAL] != null)
  return {
    active: state.get("modals")[cst.LOGIN_MODAL] != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => { dispatch(deactivateModal(cst.LOGIN_MODAL)) }
  }
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalLook)

export default LoginModal
