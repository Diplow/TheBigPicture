import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home/index'
import BigPictureView from '../pages/BigPictureView/index'
import NavBar from '../../components/NavBar/index'


const App = () => (
  <div>
  	<NavBar />
    <Route path="/bigpicture/:id" component={BigPictureView} />
    <Route path="/home" component={Home}/>
  </div>
)

export default App
