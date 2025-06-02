import React from 'react'
import { useState } from 'react'
import "../view/styles/Sidebar.css"
import { RiHome2Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import UserRoleValidator from '../utils/UserValidator';
import { useAuth } from '../context/AuthContext';
import type { AuthContextIn } from '../Interface/InAuth';

function Sidebar() {
  const [submenuRegister, setSubmenuRegister] = useState(false)
  const [submenuTransaction, setSubmenuTransaction] = useState(false)
  const [submenuReport, setSubmenuReport] = useState(false)
  const {user} =useAuth() as AuthContextIn

  function handleSubmenuRegister() {
    setSubmenuRegister(!submenuRegister)
  }
  function handleSubmenuTransaction() {
    setSubmenuTransaction(!submenuTransaction)  
  }
  function handleSubmenuReport() {
    setSubmenuReport(!submenuReport)
  }

  const roleValid: UserRoleValidator = new UserRoleValidator(user.roles);


  return (
    <section className='sidebar-section'>
        <div className='logo'>
            <i className="fa-solid fa-code"></i>
            <h2>Siretiv</h2>
        </div>
            <ul className='nav-list'>
              <li className="tr">
                <div
                      onClick={handleSubmenuRegister} 
                      className="link-title">
                        <div >
                            <RiHome2Line />
                            <h5>Inicio</h5>
                        </div> 
                        <i></i>
                    </div>
              </li>
                
                <li className="tr">
                    <div
                      onClick={handleSubmenuRegister} 
                      className="link-title">
                        <div >
                            <FaPenToSquare />
                            <h5>Registros</h5>
                        </div> 
                        <i className={`arrow ${submenuRegister? "arrow-close" : "arrow-open"}`}><MdOutlineArrowForwardIos /></i>
                    </div>
    
                    <ul className= {`sub-menu ${!submenuRegister? "sub-menu-close" : "sub-menu-open"}`}>
                        <li className="link-name">
                            <i><FaRegUser/></i>
                            <h5>Clientes</h5>  
                        </li>
                        <li className="link-name">
                            <i><LuUsers/></i>
                            <h5>Proveedores</h5>
                        </li>
                        <li className="link-name">
                            <i><AiOutlineProduct/></i>
                            <h5>Productos</h5>
                        </li>
                        <li className="link-name">
                            <i><MdOutlineCategory/></i>
                            <h5>Categoria</h5>
                        </li>
                        <li className="link-name">
                            <i><VscTools/></i>
                            <h5>Soporte</h5>
                        </li>
                      </ul>
                </li>

                <li className="tr">
                    <div
                      onClick={handleSubmenuTransaction} 
                      className="link-title">
                        <div>
                            <BsCurrencyDollar/>
                            <h5>Transacciones</h5>
                        </div>
                        <i className={`arrow ${submenuTransaction? "arrow-close" : "arrow-open"}`}><MdOutlineArrowForwardIos /></i>
                    </div>
    
                    <ul className= {`sub-menu ${!submenuTransaction? " sub-menu-close" : "sub-menu-open"}`}>
                        { roleValid.isSeller() && (
                         <li className="link-name">
                            <i><LuUsers/></i>
                            <h5>Vendedor</h5>
                        </li>   
                       )
                        }
                       { roleValid.isTechnical() && (
                         <li className="link-name">
                            <i><LuUsers/></i>
                            <h5>Soporte</h5>
                        </li>   
                       )
                        }
                    </ul>
                </li>
                { roleValid.isAdmin() && (
                         <li className="tr">
                    <div
                      onClick={handleSubmenuReport} 
                      className="link-title">
                        <div>
                            <i><TbReportSearch/></i>
                            <h5>Report</h5>
                        </div>
                        <i className={`arrow ${submenuReport? "arrow-close" : "arrow-open"}`}><MdOutlineArrowForwardIos /></i>
                    </div>
    
                    <ul className= {`sub-menu ${!submenuReport? " sub-menu-close" : "sub-menu-open"}`}>
                        <li className="link-name">
                            <i><FaRegUser/></i>
                            <h5>Ventas</h5>  
                        </li>
                        <li className="link-name">
                            <i><LuUsers/></i>
                            <h5>Soporte</h5>
                        </li>
                    </ul>
                </li>
                )
                }
                

                <li className="tr">
                <div className="link-title">
                        <div >
                            <IoSettingsOutline />
                            <h5>Configuración</h5>
                        </div> 
                        <i></i>
                    </div>
              </li>
            </ul>
    </section>
  )
}

export default Sidebar