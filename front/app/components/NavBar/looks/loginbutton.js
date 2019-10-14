import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import LoginModal from '../loginmodal'
import "./style.scss"


const LoginButtonLook = ({ user, logout }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="level-item">
      <p className="username">{user.username}</p>
      <span className="loggin-label level-item is-shrink">
        <figure className="image is-48x48" onClick={user.username != cst.GUEST_NAME ? logout : () => setShowModal(true)}>
          <img src={user.image} className="login-image is-rounded" />
        </figure>
      </span>
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

export default LoginButtonLook
