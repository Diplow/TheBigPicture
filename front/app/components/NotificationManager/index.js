import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { popNotification } from "../../actions/basics"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css";


const notifManager = ({ notifications, pop }) => {
  const notificationDOMRef = React.createRef()

  useEffect(() => {
    if (notifications.length > 0) {
      notificationDOMRef.current.addNotification(notifications[0])
      pop(notifications[0].id)
    }
  }, [notifications])

  return (
    <ReactNotification ref={notificationDOMRef} />
  )
}

notifManager.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  pop: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    notifications: state.get("notifications")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pop: (id) => { dispatch(popNotification(id)) }
  }
}
const NotificationManager = connect(mapStateToProps, mapDispatchToProps)(notifManager)

export default NotificationManager
