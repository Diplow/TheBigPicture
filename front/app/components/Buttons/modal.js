import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RadioButton from './radio'
import "./style.scss"


const EditionModalButtonLook = ({ user, classname, init, setter, icon, EditionModal, NewItem }) => {
  const [isActive, setIsActive] = useState(false)

  if (user.id == 0)
  	return null

  return (
    <div>
      <RadioButton
        classname={classname}
        isPushed={isActive}
        setIsPushed={() => setIsActive(true)}
        icon={icon}
      />
      <EditionModal
	    construct={<NewItem data={init} setData={setter} />}
	    active={isActive}
	    setActive={setIsActive}
	    data={init}
	  />
    </div>
  )
}

EditionModalButtonLook.propTypes = {
	user: PropTypes.object.isRequired,
	classname: PropTypes.string,
	init: PropTypes.object.isRequired,
	setter: PropTypes.func.isRequired,
	icon: PropTypes.string.isRequired,
	EditionModal: PropTypes.elementType.isRequired,
	NewItem: PropTypes.elementType.isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.get("user")
	}
}

const EditionModalButton = connect(mapStateToProps)(EditionModalButtonLook)

export default EditionModalButton
