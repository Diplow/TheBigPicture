import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import React, { PropTypes } from 'react'
import { activateModal } from '../../actions/basics'
import * as cst from '../../constants'
import Hashtags from '../../components/Hashtags'
import "./style.scss"


class BigPictureContentLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data,
      user,
      editBigPicture
    } = this.props;

    this.isAuthor = this.isAuthor.bind(this)
  }

  isAuthor() {
    return this.props.data.author == this.props.user.id
  }

  render() {
    return (
      <div className="section">
        <div className="level arglist-level list-title">
          <h2 className="title level-item bplist-title  is-narrow">{this.props.data.title}</h2>
          <a href="#" onClick={() => this.props.editBigPicture()} className={"button level-item is-narrow"+(this.isAuthor() ? "" : " is-hidden")}>
            <span className="icon"><i className="fas fa-edit"></i></span>
          </a>
        </div>
        <div className="content">
          <ReactMarkdown source={this.props.data.body} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    "user": state.get("user").user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editBigPicture: () => { dispatch(activateModal(cst.CREATE_BIG_PICTURE_MODAL)) }
  }
}

const BigPictureContent = connect(mapStateToProps, mapDispatchToProps)(BigPictureContentLook)

export default BigPictureContent;
