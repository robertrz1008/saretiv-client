import "../view/styles/Navbar.css"
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { AuthContextIn } from "../Interface/InAuth";
import { Button } from "primereact/button";

function Navbar() {

  const op = useRef<OverlayPanel>(null);
  const {user} = useAuth() as AuthContextIn
  const context = useAuth() as AuthContextIn;
  const exitFromApp =() => {
    context.logout()
  }


  return (
    <div className='navbar-con'>
        <h3>Dashboard</h3>

        <section className='navbar-menu-section'>
          <div style={{color:"black", fontSize:"1.7rem", cursor:"pointer", marginRight:"20px", marginTop:"10px"}} onClick={(e) => op.current?.toggle(e)} >
          <CgProfile/>
        </div>
        <OverlayPanel ref={op} className="profile-menu" style={{width:"200px", padding:"10px"}}>
            <h3>{user.username}</h3>
            <p>Role: {user.roles[0].name}</p>
            <Button className="p-button-outlined p-button-danger" style={{width:"100%"}} onClick={exitFromApp}>Logout</Button>
        </OverlayPanel>

        <i style={{color:"black", fontSize:"1.7rem", cursor:"pointer", marginRight:"20px", marginTop:"10px"}}>
          <IoSettingsOutline/>
        </i>
        </section>
    </div>
  )
}

export default Navbar