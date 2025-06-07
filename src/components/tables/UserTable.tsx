import { MdDeleteOutline } from "react-icons/md";
import { type AuthContextIn } from '../../Interface/InAuth';
import { useAuth } from '../../context/AuthContext';

export default function UserTable() {

    const {userList} = useAuth() as AuthContextIn

    function isArray(){
        if(userList.length > 0) return true
        return false
    }

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
                                    // onClick={() => {
                                    //     setCliModify(data)
                                    //     setIsCliModify(true)
                                    //     showCliModal(true)
                                    // }}
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name+" "+data.lastname}</td>
                                    <td>{data.username}</td>
                                    <td>{data.telephone}</td>
                                    <td>{data.document}</td>
                                    <td>{data.roles[0].name}</td>
                                    <td>{data.status? "ACTIVO" : "INACTIVO"}</td>
                                    <td
                                        onClick={(e) =>{    
                                            e.stopPropagation()
                                        }}
                                        className='td-icon'
                                    >
                                        <div 
                                            // onClick={(e) => {
                                            //     e.stopPropagation()
                                            //     setDelCliModal(true)
                                            // }}
                                            className="icon-con">
                                            <a className="my-anchor-element">
                                                <MdDeleteOutline/> 
                                            </a>
                                            {/* <Tooltip anchorSelect=".my-anchor-element" place="left-start">Eliminar</Tooltip> */}

                                        </div>
                                        {/* <DeleteCliModal
                                                id={data.id as number}
                                        
                                        /> */}
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