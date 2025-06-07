import "../view/styles/Navbar.css"
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import {logoutRequest} from '../services/Auth.service'
import { IoSettingsOutline } from "react-icons/io5";

function Navbar() {

  const navigate = useNavigate();
  async function exitFromApp(){
    await logoutRequest()
    navigate("/login")
  }
  return (
    <div className='navbar-con'>
        <h3>Dashboard</h3>
        {/* <Button label="Serrar sesion" onClick={exitFromApp}/> */}
        <i style={{color:"black", fontSize:"1.7rem", cursor:"pointer", marginRight:"20px", marginTop:"10px"}}>
          <IoSettingsOutline/>
          </i>
    </div>
  )
}

export default Navbar