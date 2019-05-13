import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BigPictureModal from '../modal'


const AddBigPictureButton = ({initBp}) => {
  const [createBPisActive, setCreateBPisActive] = useState(false)
  const icon = initBp.id == undefined ? "fas fa-plus" : "fas fa-edit"
  return (
  	<span>
	  <a
		onClick={() => { setCreateBPisActive(true) }}
		className="button level-item is-narrow">
		<span className="icon"><i className={icon}></i></span>
	  </a>
	  <BigPictureModal
        active={createBPisActive}
		setActive={setCreateBPisActive}
		initBp={initBp}
      />
    </span>
  )
}

AddBigPictureButton.propTypes = {
	initBp: PropTypes.object.isRequired
}

export default AddBigPictureButton
