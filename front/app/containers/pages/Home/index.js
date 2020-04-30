import { connect } from 'react-redux'
import { getSubjects } from '../../../actions/'
import HomeLook from './look'


const mapStateToProps = (state) => {
  return {
  	user: state.get("user"),
  	count: state.get("global").subjectCount
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getBigPictures: (page, options) => { dispatch(getSubjects(page, options)) },
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home