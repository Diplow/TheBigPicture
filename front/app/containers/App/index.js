import React from 'react'
import { Route } from 'react-router-dom'

import Category from '../pages/Category'
import Categories from '../pages/Categories'
import SubjectView from '../pages/BigPicture'
import UserView from '../pages/User'
import NavBar from '../NavBar'
import Api from '../Api'
import Executor from '../Api/executor'
import NotificationManager from '../../components/NotificationManager'
import './style.scss'

const App = () => (
  <div>
    <NavBar />
    <div id="routes">
      <Route exact={true} path="/bigpicture/:bigPictureId" component={SubjectView} />
      <Route exact={true} path="/categories/:category" component={Category} />
      <Route exact={true} path="/user/:id" component={UserView} />
      <Route exact={true} path="/" component={Categories}/>
    </div>
    <NotificationManager />
    <Api />
    <Executor />
  </div>
)

export default App
