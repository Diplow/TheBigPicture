import { connect } from 'react-redux'
import { getSubjects } from '../../../actions/'

import HomeLook from './look'

import { getPageFormatter } from '../../../components/List'
import uuid from 'uuid/v4'

import * as cst from '../../../constants'


const mapStateToProps = (state) => ({
  user: state.get("user"),
  bigPictures: state.get("bigpictures").filter((bp) => bp.kind == cst.SUBJECT && bp.private == false),
  count: state.get("global").subjectCount
})

const mapDispatchToProps = (dispatch, state) => ({
  getBigPictures: getPageFormatter(dispatch, getSubjects)
})

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home