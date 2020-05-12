import { connect } from 'react-redux'
import { getSubjects } from '../../../actions/'
import HomeLook from './look'
import uuid from 'uuid/v4'


const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
    count: state.get("global").subjectCount
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getBigPictures: (page, options, request_id) => {
      const requestId = request_id || uuid()
      dispatch(getSubjects(page, options, requestId));
      return requestId
    }
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home