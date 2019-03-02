import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import {} from '../../constants'
import "./style.scss"


class BigPictureViewHeaderLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture
    } = this.props;
  }


  render() {
    return (
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="bp-header-container">
            <h1 className="title">
              {this.props.bigPicture.title}
            </h1>
          </div>
        </div>
      </section>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const BigPictureViewHeader = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewHeaderLook)

export default BigPictureViewHeader
