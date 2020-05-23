import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import BigPictureView from '../pages/BigPicture'
import RatingView from '../pages/Rating'
import UserView from '../pages/User'
import NavBar from '../../components/NavBar'
import Api from '../../components/Api'
import Executor from '../../components/Api/executor'
import NotificationManager from '../../components/utils/notification'
import './style.scss'

const App = () => (
  <div>
    <div id="navbardiv">
        <NavBar />
    </div>
    <div id="routes">
        <Route exact={true} path="/subject/:subjectId/bigPicture/:bpId" component={BigPictureView} />
        <Route exact={true} path="/subject/:subjectId/rating/:ratingId" component={RatingView} />
        <Route exact={true} path="/user/:id" component={UserView} />
        <Route path="/home" component={Home}/>
        <Route exact={true} path="/" component={Home}/>
    </div>
    <NotificationManager />
    <Api />
    <Executor />
  </div>
)

export default App
