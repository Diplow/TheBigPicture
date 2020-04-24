import { connect } from 'react-redux'
import { logout } from '../../actions/api'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LoginModal from './loginmodal'
import UserIcon from '../../images/icons/user.svg';
import * as cst from '../../constants'
import "./style.scss"


const LoginButtonLook = ({ user, logout }) => {
  const [showModal, setShowModal] = useState(false)

  if (user.id != 0)
    return null
  return (
    <div className="vde dropdown nav-item">
      <a href="#" className="icon-button" onClick={() => setShowModal(true)}>
        <img src={UserIcon} style={{width:"100%"}} className="vde navbar menu is-rounded" />
      </a>
      <LoginModal
        active={showModal}
        setActive={setShowModal}
      />
    </div>
  )
}

LoginButtonLook.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout()) }
  }
}

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonLook)

export default LoginButton
