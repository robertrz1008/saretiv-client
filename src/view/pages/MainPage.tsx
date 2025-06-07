import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import "../styles/Register.css"

function MainPage() {
  return (
    <div className='app'>
        <Sidebar/>
         <div className='main-page-layout'>
         <Navbar/>
        <Outlet/> 
      </div>
    </div>
  )
}

export default MainPage