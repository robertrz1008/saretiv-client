import React, { useState } from 'react'
import { useAppContext } from '../../../context/AppContext';
import type { AppContextIn } from '../../../Interface/InApp';
import { MdDeleteOutline } from 'react-icons/md';
import DeleteSupportTypeModal from '../../Modal/confirm/DeleteSupportTypeModal';

function SupportTypeTable() {

    const context = useAppContext() as AppContextIn
    const [supTypeID, setSupTypeID] = useState(0);


  return (
    <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Descripción</th>
                    <th>Categoria Dispositivo</th>
                    <th>Monto</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !context.supportTypes? (<h3 >No product</h3>): (
                     <tbody>
                        {
                            context.supportTypes.map((data, id) => (
                                <tr 
                                    onClick={() =>{    
                                        context.setSupportTypeUpdate(data)
                                        context.setSupportTypeUpdateMode(true)
                                        context.showFormModal(true)
                                    }}
                                className='td-icon'
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.description}</td>
                                    <td>{data.category.name}</td>
                                    <td>{data.amount}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <MdDeleteOutline
                                            onClick={() => {
                                                setSupTypeID(data.id as number)
                                                context.showConfirmModal(true)
                                            }}
                                        />
                                        <DeleteSupportTypeModal id={supTypeID}/>
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

export default SupportTypeTable