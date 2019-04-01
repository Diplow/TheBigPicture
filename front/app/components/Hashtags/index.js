import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


class HashtagsLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data
    } = this.props;
  }

  render() {
    return (
   	  <nav className="breadcrumb hashtags has-dot-separator is-small" aria-label="breadcrumbs">
        <ul>
        {(this.props.data !== undefined) ? this.props.data.split(" ").map(elt => (
          <li key={elt}><a href="#" className="level-item hashtag is-narrow">{elt}</a></li>
        )) : null}
        </ul>
      </nav>
	)
  }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Hashtags = connect(mapStateToProps, mapDispatchToProps)(HashtagsLook)

export default Hashtags