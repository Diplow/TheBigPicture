import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { getBigPictures } from '../../../actions/'
import { unselectBigPicture as unselect } from '../../../actions/basics'
import BigPictureList from '../../../components/BigPicture/list'
import BigPictureModal from '../../../components/BigPicture/modal'
import "./style.scss"


class HomeLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      getBigPictures,
      unselectBigPicture
    } = this.props;
  }

  componentDidMount() {
    this.props.getBigPictures()
    this.props.unselectBigPicture()
  }

  render() {
    return (
      <div className="container tbp-section">
        <BigPictureList bigPictures={this.props.bigPictures} title="VUES" />
        <BigPictureModal bigPicture={null}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    "bigPictures": state.get("bigpictures").filter(bigPicture => bigPicture.resourceFor == null && !bigPicture.isArg)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "getBigPictures": () => { dispatch(getBigPictures()) },
    "unselectBigPicture": () => { dispatch(unselect()) }
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home