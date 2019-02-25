import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home/index'
import BigPictureView from '../pages/BigPictureView/index'
import NavBar from '../../components/NavBar/index'


const App = () => (
  <div>
  	<NavBar />
    <Route path="/home" component={Home}/>
    <Route path="/bigpicture/:id" component={BigPictureView} />
  </div>
)

export default App
