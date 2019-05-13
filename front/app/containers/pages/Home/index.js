import { connect } from 'react-redux'
import { getBigPictures } from '../../../actions/'
import HomeLook from './look'


const mapStateToProps = (state) => {
  return {
  	user: state.get("user").user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBigPictures: () => { dispatch(getBigPictures()) }
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home