import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import BigPictureView from '../pages/BigPicture'
import NavBar from '../../components/NavBar'
import NotificationManager from '../../components/utils/notification'


const App = () => (
  <div>
    <NavBar />
    <Route exact={true} path="/bigpicture/:id" component={BigPictureView} />
    <Route path="/home" component={Home}/>
    <Route exact={true} path="/" component={Home}/>
    <NotificationManager />
  </div>
)

export default App
