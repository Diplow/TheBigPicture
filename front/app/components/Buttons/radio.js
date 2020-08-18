import React from 'react'
import PropTypes from 'prop-types'
import "./style.scss"


const RadioButton = ({ classname, isPushed, setIsPushed, icon }) => (
  <span className={`${classname} level-item is-narrow`}>
    <a
      onClick={() => setIsPushed(!isPushed)}
      className={isPushed ? " is-active" : ""}>

      {
        typeof(icon) === "string"
          ? <span className="icon is-small"><i className={icon}></i></span>
          : icon
      }
    </a>
  </span>
)

RadioButton.propTypes = {
  isPushed: PropTypes.bool.isRequired,
  setIsPushed: PropTypes.func.isRequired,
  classname: PropTypes.string,
  icon: PropTypes.string.isRequired
}

export default RadioButton
