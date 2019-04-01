import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { activateModal } from '../../actions/basics'
import * as cst from '../../constants'
import BigPicturePreview from './preview'
import "./style.scss"


export class BigPictureListLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      title,
      bigPictures,
      createBigPicture,
      itemGenerator,
      isAuthor
    } = this.props;
  }

  render() {
    return (
      <div className="section">
        <div className="level arglist-level list-title">
          <h2 className="title level-item bplist-title is-narrow">{this.props.title}</h2>
          <a href="#" onClick={() => this.props.createBigPicture()} className={"button level-item is-narrow"+(this.props.isAuthor(this.props.user, this.props.bigPicture)? "" : " is-hidden")}>
            <span className="icon"><i className="fas fa-plus"></i></span>
          </a>
        </div>
        <div className="content">
          {
            this.props.bigPictures.map(this.props.itemGenerator)
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user").user,
    bigPicture: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "createBigPicture": () => (dispatch(activateModal(cst.CREATE_BIG_PICTURE_MODAL))),
    "itemGenerator": (bigPicture) => (<BigPicturePreview key={bigPicture.id} data={bigPicture} showDetails={false} />),
    "isAuthor": (user, bigPicture) => { return true }
  }
}

const BigPictureList = connect(mapStateToProps, mapDispatchToProps)(BigPictureListLook)

export default BigPictureList
