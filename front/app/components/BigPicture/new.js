import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { patchBigPicture, postBigPicture } from '../../actions/index'
import {} from '../../constants'
import "./style.scss"


class NewBigPictureLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture
    } = this.props;

    this.fillDefault = this.fillDefault.bind(this)
    this.computeBigPicture = this.computeBigPicture.bind(this)
  }

  fillDefault() {
    if (this.props.bigPicture != null) {
      document.getElementById("NewBigPictureTitle").value = this.props.bigPicture.title
      document.getElementById("NewBigPictureContent").value = this.props.bigPicture.body
    }
  }

  componentDidMount() {
    this.fillDefault()
  }

  componentDidUpdate() {
    this.fillDefault()
  }

  computeBigPicture() {
    let res = {
      title: document.getElementById("NewBigPictureTitle").value,
      body: document.getElementById("NewBigPictureContent").value,
    }
    if (this.props.bigPicture == undefined) { // Create big picture
      this.props.createBigPicture(res)
    }
    else { // Edit big picture
      res.id = this.props.bigPicture.id
      res.resourceFor = this.props.bigPicture.resourceFor
      this.props.editBigPicture(res)
    }
  }

  render() {
    return (
      <div className="newBigPicture-modal">
        <p className="subtitle-modal">Titre</p>
        <input
          id="NewBigPictureTitle"
          className="input tbp-modal"
          type="text"
          placeholder="Titre de la vue" />
        <p className="subtitle-modal">Contenu</p>
        <textarea
          id="NewBigPictureContent"
          className="textarea tbp-modal"
          placeholder="Contenu" />
        <div className="level">
          <div className="level-left" />
          <div className="level-right">
            <div className="control">
              <button
                className="button is-dark"
                onClick={this.computeBigPicture}>
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
    "editBigPicture": (bigPicture) => { dispatch(patchBigPicture(bigPicture)) },
    "createBigPicture": (bigPicture) => { dispatch(postBigPicture(bigPicture)) }
  }
}

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
