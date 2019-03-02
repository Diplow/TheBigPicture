import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import {} from '../../constants'
import Hashtags from '../../components/Hashtags'
import NewBigPicture from '../../components/BigPicture/new'
import "./style.scss"


class BigPictureContentLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data
    } = this.props;

    this.state = {
      createModal: false
    }
  }


  render() {
    return (
      <div>
        <div className="level arglist-level">
          <h2 className="title level-item arglist-title">Vue</h2>
          <a href="#" onClick={() => this.setState({createModal: !this.state.createModal})} className="button level-item is-narrow">
            <span className="icon"><i className="fas fa-edit"></i></span>
          </a>
        </div>
        <div className="content">
          {this.props.data.body}
        </div>
        <Hashtags data={this.props.data.hashtags} />
        <div className={"modal" + (this.state.createModal ? " is-active" : "")}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modification de la vue</p>
              <button className="delete" onClick={() => this.setState({...this.state, createModal: false})} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <NewBigPicture data={this.props.data}/>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const BigPictureContent = connect(mapStateToProps, mapDispatchToProps)(BigPictureContentLook)

export default BigPictureContent;
