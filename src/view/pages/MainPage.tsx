import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import "../styles/Register.css"
import ConfigSidebar from '../../components/RightSidebar/ConfigSidebar'
import EnterpriseFormModal from '../../components/Modal/EnterpriseFormModal'
import { useAuth } from '../../context/AuthContext'
import { AuthContextIn } from '../../Interface/InAuth'
import UserRoleValidator from '../../utils/UserValidator'
import { useEffect } from 'react'
import { Toast } from 'primereact/toast'
import { useAppContext } from '../../context/AppContext'
import { AppContextIn } from '../../Interface/InApp'

function MainPage() {
  const {user, logout} = useAuth() as AuthContextIn
  const {toast} = useAppContext() as AppContextIn
  const roleValid: UserRoleValidator = new UserRoleValidator(user.roles);
  const navigate = useNavigate()


  useEffect(() => {
    const roleValid: UserRoleValidator = new UserRoleValidator(user.roles);
    let route: string = "/login";

    if(roleValid.isAdmin()){
      route = "/Admin"
    }
    if(roleValid.isSeller()){
      route = "/vender"
    }
    if(roleValid.isTechnical()){
      route = "/SoporteTecnico"
    }
    navigate(route)
  },[])

  const ejecutarAntesDeSalir = () => {
    console.log("Guardando datos antes de salir...");
    logout()
  };

  useEffect(() => { 
    const handleBeforeUnload = (_event: BeforeUnloadEvent) => {
      ejecutarAntesDeSalir();

      // Esto activa el mensaje de confirmación del navegador
      // event.preventDefault();
      // event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  return (
    <div className='app'>
        <Sidebar/>
         <div className='main-page-layout'>
         <Navbar/>
        <Outlet/> 
      </div>
      
      {
        roleValid.isAdmin() && (<ConfigSidebar/>)
      }
      
      <EnterpriseFormModal/>
      <Toast ref={toast} position="top-right"/>
    </div>
  )
}

export default MainPage