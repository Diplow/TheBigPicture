import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import BigPictureView from '../pages/BigPicture'
import NavBar from '../../components/NavBar'


const App = () => (
  <div>
    <NavBar />
    <Route exact={true} path="/bigpicture/:id" component={BigPictureView} />
    <Route path="/home" component={Home}/>
    <Route exact={true} path="/" component={Home}/>
  </div>
)

export default App
