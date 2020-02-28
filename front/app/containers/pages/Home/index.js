import { connect } from 'react-redux'
import { getSubjects, getOwnSubjects } from '../../../actions/'
import HomeLook from './look'


const mapStateToProps = (state) => {
  return {
  	user: state.get("user"),
  	count: state.get("global").subjectCount
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getBigPictures: (page) => { dispatch(getSubjects(page)) },
    getOwnSubjects: (page, userId) => { dispatch(getOwnSubjects(userId, page)) },
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home