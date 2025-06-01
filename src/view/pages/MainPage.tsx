import React from 'react'
import Sidebar from '../../components/Sidebar'
import Home from './main/Home'

function MainPage() {
  return (
    <div className='app'>
        <Sidebar/>
        <Home/>
    </div>
  )
}

export default MainPage