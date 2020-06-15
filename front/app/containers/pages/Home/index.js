import { connect } from 'react-redux'
import { getSubjects } from '../../../actions/'
import HomeLook from './look'
import { getPageFormatter } from '../../../components/List'
import uuid from 'uuid/v4'


const mapStateToProps = (state) => ({
  user: state.get("user"),
  count: state.get("global").subjectCount
})

const mapDispatchToProps = (dispatch, state) => ({
  getBigPictures: getPageFormatter(dispatch, getSubjects)
})

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home