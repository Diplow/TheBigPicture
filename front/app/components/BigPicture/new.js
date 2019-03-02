import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { patchBigPicture } from '../../actions/index'
import {} from '../../constants'
import "./style.scss"


class NewBigPictureLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data
    } = this.props;
  }

  componentDidMount() {
    document.getElementById("NewBigPictureTitle").value = this.props.data.title
    document.getElementById("NewBigPictureContent").value = this.props.data.body
    document.getElementById("NewBigPictureHashtags").value = this.props.data.hashtags
  }

  computeBigPicture() {
    return {
      id: this.props.data.id,
      title: document.getElementById("NewBigPictureTitle").value,
      body: document.getElementById("NewBigPictureContent").value,
      hashtags: document.getElementById("NewBigPictureHashtags").value,
      resourceFor: this.props.data.resourceFor
    }
  }

  render() {
    return (
      <div className="newBigPicture-modal">
        <p className="subtitle-modal">Titre</p>
        <input
          id="NewBigPictureTitle"
          className="input"
          type="text"
          placeholder="Titre de la vue" />
        <p className="subtitle-modal">Mots-clé</p>
        <input
          id="NewBigPictureHashtags"
          className="input"
          type="text"
          placeholder="Mots-clé de la vue" />
        <p className="subtitle-modal">Contenu</p>
        <textarea
          id="NewBigPictureContent"
          className="textarea"
          placeholder="Contenu" />
        <div className="level">
          <div className="level-left" />
          <div className="level-right">
            <div className="control">
              <button
                className="button is-dark"
                onClick={() => {this.props.editBigPicture(this.computeBigPicture())}}>
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
	  )
  }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    "editBigPicture": (bigPicture) => { dispatch(patchBigPicture(bigPicture)) }
  }
}

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
