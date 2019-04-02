import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { deactivateModal } from '../../actions/basics'
import * as cst from '../../constants'
import NewBigPicture from './new'
import "./style.scss"


export class BigPictureModalLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture,
      active,
      close,
      body
    } = this.props;
  }

  render() {
    return (
      <div className={"modal" + (this.props.active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.headline}</p>
            <button className="delete" onClick={() => this.props.close()} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            {this.props.body(this.props.bigPicture)}
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const bigPicture = state.get("modals")[cst.CREATE_BIG_PICTURE_MODAL]
  return {
    bigPicture: (bigPicture != null && bigPicture.id == undefined) ? null : bigPicture,
    headline: (bigPicture != null && bigPicture.id == undefined) ? "Nouvelle vue" : "Modification de la vue",
    active: bigPicture != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => { dispatch(deactivateModal(cst.CREATE_BIG_PICTURE_MODAL)) },
    body: (bigPicture) => (<NewBigPicture bigPicture={bigPicture} />)
  }
}

const BigPictureModal = connect(mapStateToProps, mapDispatchToProps)(BigPictureModalLook)

export default BigPictureModal
