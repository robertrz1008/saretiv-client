import "../view/styles/Navbar.css"
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { AuthContextIn } from "../Interface/InAuth";
import { Button } from "primereact/button";
import { useAppContext } from "../context/AppContext";
import type { AppContextIn } from "../Interface/InApp";
import UserRoleValidator from "../utils/UserValidator";

function Navbar() {

  const op = useRef<OverlayPanel>(null);
  const {user, logout} = useAuth() as AuthContextIn
  const context = useAppContext() as AppContextIn
  const roleValid: UserRoleValidator = new UserRoleValidator(user.roles);
  
  const exitFromApp =() => {
    logout()
  }


  return (
    <div className='navbar-con'>
        <h3 className="title">{context.globalTitle}</h3>

        <section className='navbar-menu-section'>
          <div  style={{color:"black", fontSize:"1.7rem", cursor:"pointer", marginRight:"20px", marginTop:"10px"}} onClick={(e) => op.current?.toggle(e)} >
          <CgProfile className="navbar-icon-profile"/>
        </div>
        <OverlayPanel ref={op} className="profile-menu" style={{width:"210px", padding:"10px"}}>
            <h3>{user.username}</h3>
            <p>Role: {user.roles[0].name}</p>
            <Button className="p-button-outlined p-button-danger" style={{width:"100%"}} onClick={exitFromApp}>Cerrar Sessión</Button>
        </OverlayPanel>

        {roleValid.isAdmin() && (
          <i  style={{color:"black", fontSize:"1.7rem", cursor:"pointer", marginRight:"20px", marginTop:"10px"}}>
          <IoSettingsOutline
            className="navbar-icon-setting"
            onClick={() => context.handleConfigSidebar(true)}
          />
        </i>
        )}
        </section>
    </div>
  )
}

export default Navbar