import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import BigPictureView from '../pages/BigPicture'
import UserView from '../pages/User'
import NavBar from '../../components/NavBar'
import Api from '../../components/Api'
import Executor from '../../components/Api/executor'
import NotificationManager from '../../components/utils/notification'


const App = () => (
  <div>
    <NavBar />
    <Route exact={true} path="/bigpicture/:id/:user" component={BigPictureView} />
    <Route exact={true} path="/bigpicture/:id" component={BigPictureView} />
    <Route exact={true} path="/user/:id" component={UserView} />
    <Route path="/home" component={Home}/>
    <Route exact={true} path="/" component={Home}/>
    <NotificationManager />
    <Api />
    <Executor />
  </div>
)

export default App
