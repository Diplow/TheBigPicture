import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import NewBigPicture from '../../components/BigPicture/new'
import {} from '../../constants'
import "./style.scss"


class BigPictureViewHeaderLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture
    } = this.props;

    this.state = {
      createModal: false
    }
  }


  render() {
    return (
      <section className="hero is-dark">
        <div className="hero-body">
          <h1 className="title bp-title">
            {this.props.bigPicture.title}
            <a href="#" onClick={() => this.setState({createModal: !this.state.createModal})} className="title-button button level-item is-narrow">
              <span className="icon"><i className="fas fa-edit"></i></span>
            </a>
          </h1>
        </div>
        <div className={"modal" + (this.state.createModal ? " is-active" : "")}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modification de la vue</p>
              <button className="delete" onClick={() => this.setState({...this.state, createModal: false})} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <NewBigPicture data={this.props.bigPicture}/>
            </section>
            <footer className="modal-card-foot">
            </footer>
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
