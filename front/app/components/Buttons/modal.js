import React, { useState } from 'react'
import { connect } from 'react-redux'
import RadioButton from './radio'
import * as cst from '../../constants'
import "./style.scss"


const EditionModalButtonLook = (props) => {
  const {
    user,
    classname,
    init,
    setter,
    icon,
    EditionModal,
    title,
    NewItem
  } = props
  const [isActive, setIsActive] = useState(false)

  if (user.id == cst.GUEST_ID) return null

  return (
    <div>
      <RadioButton
        classname={classname}
        isPushed={isActive}
        setIsPushed={() => setIsActive(true)}
        icon={icon}
      />
      <EditionModal
        title={title}
        construct={<NewItem data={init} setData={setter} />}
        active={isActive}
        setActive={setIsActive}
        data={init}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.get("user")
  }
}

const EditionModalButton = connect(mapStateToProps)(EditionModalButtonLook)

export default EditionModalButton
