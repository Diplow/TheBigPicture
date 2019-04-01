import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { setBigPicture, getBigPicture, getArguments, getResources } from '../../../actions/index'
import * as cst from '../../../constants'
import ResourceList from '../../../components/Resource/list'
import ArgumentList from '../../../components/Argument/list'
import BigPicture from '../../../components/BigPicture'
import BigPictureModal from '../../../components/BigPicture/modal'
import ArgumentModal from '../../../components/Argument/modal'
import ResourceModal from '../../../components/Resource/modal'
import "./style.scss"


class BigPictureViewLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      match,
      bigPicture,
      bigPictureId,
      setBigPicture
    } = this.props;
  }

  componentDidMount() {
    this.props.setBigPicture(this.props.match.params.id)
  }

  render() {
    if (this.props.bigPicture !== null) {
      return (   
        <div className="container tbp-section">
          <div key={this.props.bigPicture.id}>
            <BigPicture data={this.props.bigPicture} />
            <ResourceList title="Ressources" bigPicture={this.props.bigPicture} />
            <ArgumentList title="Raisons" bigPicture={this.props.bigPicture} />
          </div>
          <BigPictureModal bigPicture={this.props.bigPicture}/>
          <ArgumentModal bigPicture={this.props.bigPicture}/>
          <ResourceModal bigPicture={this.props.bigPicture}/>
        </div>
      )
    }
    else {
      return (
        <div/>
      )
    } 
  }
}


const mapStateToProps = (state, ownProps) => {
  const currentElts = state.get("bigpictures").filter(elt => elt.id == ownProps.match.params.id)
  return {
    "bigPicture": currentElts.length == 1 ? currentElts[0] : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "setBigPicture": (id) => { dispatch(setBigPicture(id)) }
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
