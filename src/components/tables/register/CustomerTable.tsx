import { useState } from 'react';
import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import DeleteCostomerModal from '../../Modal/confirm/DeleteCostomerModal'; 
import { MdDeleteOutline } from "react-icons/md";

function CustomerTable() {

    const context = useAppContext() as AppContextIn
    const [customerID, setCustomerID] = useState(0);
    

    function isArray(){
        if(context.customers.length > 0) return true
        return false
    }
    // function clickIconDelete(e: React.MouseEvent<HTMLDivElement>){
    //     e.stopPropagation()
    //     context.showConfirmModal(true)
    // }

    return (
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Nombre Apellido</th>
                    <th>Cedula</th>
                    <th>telefono</th>
                    <th>Direccion</th>
                    <th>Estado</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !isArray()? (<h3 >No product</h3>): (
                     <tbody>
                        {
                            context.customers.map((data, id) => (
                                <tr 
                                    onClick={() =>{    
                                        context.setCustUpdate(data)
                                        context.setCustUpdateMode(true)
                                        context.showFormModal(true)
                                        context.addCustomerDoc(data.document)
                                    }}
                                className='td-icon'
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name+" "+data.lastname }</td>
                                    <td>{data.document}</td>
                                    <td>{data.telephone}</td>
                                     <td>{data.address}</td>
                                     <td>{data.status? "ACTIVO" : "INACTIVO"}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <div 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCustomerID(data.id as number)
                                                context.showConfirmModal(true)
                                            }}
                                            className="icon-con">
                                            <a className="my-anchor-element">
                                                <MdDeleteOutline/> 
                                            </a>
                                        </div>
                                        <DeleteCostomerModal id={customerID}/>
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

export default CustomerTable