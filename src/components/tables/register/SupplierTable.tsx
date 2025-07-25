import { useState } from 'react'
import { useAppContext } from '../../../context/AppContext';
import type { AppContextIn } from '../../../Interface/InApp';
import { MdDeleteOutline } from 'react-icons/md';
import DeleteSupplierModal from '../../Modal/confirm/DeleteSupplierModal';

function SupplierTable() {
   const context = useAppContext() as AppContextIn
    const [supplierID, setSupplierID] = useState(0);
    

    function isArray(){
        if(context.suppliers.length > 0) return true
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
                    <th>Nombreo</th>
                    <th>RUC</th>
                    <th>telefono</th>
                    <th>Direccion</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !isArray()? (<h3 >No product</h3>): (
                     <tbody>
                        {
                            context.suppliers.map((data, id) => (
                                <tr 
                                    onClick={() =>{    
                                        // context.setCustUpdate(data)
                                        // context.setCustUpdateMode(true)
                                        // context.showFormModal(true)
                                        // context.addCustomerDoc(data.document)
                                        context.setSupplierUpdate(data)
                                        context.setSupUpddateMode(true)
                                        context.showFormModal(true)
                                    }}
                                className='td-icon'
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.ruc}</td>
                                    <td>{data.telephone}</td>
                                    <td>{data.address}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <MdDeleteOutline
                                            onClick={() => {
                                                setSupplierID(data.id as number)
                                                context.showConfirmModal(true)
                                            }}
                                        />
                                        <DeleteSupplierModal id={supplierID}/>
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

export default SupplierTable