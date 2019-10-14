import { connect } from 'react-redux'
import { getSubjects } from '../../../actions/'
import HomeLook from './look'


const mapStateToProps = (state) => {
  return {
  	user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBigPictures: () => { dispatch(getSubjects()) }
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home