import { MdDeleteOutline } from "react-icons/md";
import { type AuthContextIn } from '../../Interface/InAuth';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from "../../context/AppContext";
import type { AppContextIn } from "../../Interface/InApp";
import { GrShieldSecurity } from "react-icons/gr";
import DeleteUserModal from "../Modal/confirm/DeleteUserModal";
import { useEffect, useState } from "react";
import PasswordForm from "../reusable/PasswordForm";

export default function UserTable() {


    const {userList} = useAuth() as AuthContextIn
    const context = useAppContext() as AppContextIn
    
    const {showFormModal} = useAppContext() as AppContextIn

    //useState
    const [userID, setUserID] = useState(0)
    const [showPassModal, setShowPassModal] = useState(false)


    function setPassFormModal(val: boolean){
        setShowPassModal(val)
    }
    function isArray(){
        if(userList.length > 0) return true
        return false
    }





    useEffect(() => {
        console.log(userID)
    }, [userID])
     
  return (
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Nombre y Apellido</th>
                    <th>Nombre Usuario</th>
                    <th>telefono</th>
                    <th>Documento</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !isArray? (<h1>No hay cliente</h1>): (
                     <tbody>
                        {
                            userList.map((data, id) => (
                                <tr 
                                    onClick={() => {
                                        context.setUserUpdate(data)
                                        context.userUpdateMode(true)
                                        context.addUserDoc(data.document)
                                        showFormModal(true)
                                    }}
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name+" "+data.lastname}</td>
                                    <td>{data.username}</td>
                                    <td>{data.telephone}</td>
                                    <td>{data.document}</td>
                                    <td>{data.roles[0].name }</td>
                                    <td>{data.status? "ACTIVO" : "INACTIVO"}</td>
                                    <td
                                        onClick={(e) =>{
                                            e.stopPropagation()
                                        }} 
                                        className='td-icon'
                                    >
                                        <div style={{display:"flex"}}>
                                            <div 
                                                className="icon-con">
                                                <a className="my-anchor-element">
                                                    <GrShieldSecurity onClick={() => setPassFormModal(true)}/> 
                                                </a>
                                            </div>
                                            <div 
                                            onClick={() =>{
                                                setUserID(data.id as number)
                                                context.showConfirmModal(true)
                                            }}
                                            className="icon-con">
                                            <a className="my-anchor-element">
                                                <MdDeleteOutline/> 
                                            </a>
                                            
                                            {/* <Tooltip anchorSelect=".my-anchor-element" place="left-start">Eliminar</Tooltip> */}
                                            </div>
                                            <DeleteUserModal id={userID}/>
                                            <PasswordForm
                                                setPassFormModal={setPassFormModal}
                                                showPassModal={showPassModal}
                                                id={userID}
                                            />
                                            
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody> 
                )
            }
        </table>
  )
}