import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deleteBigPicture } from '../../actions/index'
import { selectBigPicture } from '../../actions/basics'
import "./style.scss"


export const tbpIcon = (icon) => {
  return (
    <span className="icon is-small">
      <i className={"fas " + icon}></i>
    </span>
  )
}


export class PreviewButtonLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data,
      icon,
      user,
      action,
      isAuthorized,
      to
    } = this.props;
    this.state = {
    }
  }

  render() {
    if (this.props.to != undefined) {
      return (
          <Link 
            className={"level-item " + (this.props.isAuthorized(this.props.user, this.props.data) ? "" : "is-hidden")}
            onClick={() => this.props.action(this.props.data.id)}
            to={this.props.to(this.props.data.id)}>
            {tbpIcon(this.props.icon + " bp-preview-icon")}
          </Link>
        ) 
    }
    else {
      return (
        <a
          href="#"
          className={"level-item " + (this.props.isAuthorized(this.props.user, this.props.data) ? "" : "is-hidden ")}
          onClick={() => this.props.action(this.props.data.id)}>
            {tbpIcon(this.props.icon + "bp-preview-icon ")}
        </a>
      )
    }
  }
}

const LookButtonConfig = {
  mapStateToProps: (state) => {
    return {
      icon: "fa-search ",
      user: state.get("user").user
    }
  },
  mapDispatchToProps: (dispatch) => {
    return {
      action: (id) => { dispatch(selectBigPicture(id)) },
      to: (id) => { return "/bigPicture/" + id + "/"},
      isAuthorized: (user, data) => { return true }
    }
  }
}

const TrashButtonConfig = {
  mapStateToProps: (state) => {
    return {
      icon: "fa-trash ",
      user: state.get("user").user
    }
  },
  mapDispatchToProps: (dispatch) => {
    return {
      action: (id) => { dispatch(deleteBigPicture(id)) },
      isAuthorized: (user, data) => { return user.id == data.author }
    }
  }
}


export const LookButton = connect(LookButtonConfig.mapStateToProps, LookButtonConfig.mapDispatchToProps)(PreviewButtonLook)
export const TrashButton = connect(TrashButtonConfig.mapStateToProps, TrashButtonConfig.mapDispatchToProps)(PreviewButtonLook)
