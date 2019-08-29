import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import LoginModal from '../loginmodal'
import "./style.scss"


const LoginButtonLook = ({ username, logout }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="level-item">
      <p className="username">{username}</p>
      <span className="loggin-label level-item is-shrink">
        {
          username != cst.GUEST_NAME
          ? <div 
              className="button username logged-out"
              onClick={logout}>
              <span className="icon is-small">
                <i className="fas fa-user" />
              </span>
            </div>
          : <div
              className="button username logged-in"
              onClick={() => setShowModal(true)}>
              <span className="icon is-small">
                <i className="fas fa-user" />
              </span>
            </div>
        }
      </span>
      <LoginModal
        active={showModal}
        setActive={setShowModal}
      />
    </div>
  )
}

LoginButtonLook.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default LoginButtonLook
