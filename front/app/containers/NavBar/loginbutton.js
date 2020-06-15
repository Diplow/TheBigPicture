import { connect } from 'react-redux'
import { logout } from '../../actions/api'
import React, { useState } from 'react'
import LoginModal from './loginmodal'
import { ReactComponent as UserIcon } from '../../images/icons/user.svg';
import * as cst from '../../constants'
import "./style.scss"


const LoginButtonLook = ({ user, logout }) => {
  const [showModal, setShowModal] = useState(false)

  if (user.id != cst.GUEST_ID) return null

  return (
    <div className="vde dropdown nav-item">
      <a className="icon-button" onClick={() => setShowModal(true)}>
        <UserIcon className="vde navbar image is-32x32" />
      </a>
      <LoginModal
        active={showModal}
        setActive={setShowModal}
      />
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.get("user")
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logout()) }
})

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonLook)

export default LoginButton
