import { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import { MdDeleteOutline } from 'react-icons/md'
import DeletePurchaseProductModal from '../../Modal/confirm/DeletePurchaseProductModal'
import { useState } from 'react'

function PurchaseProductDetailTable() {

    const context = useAppContext() as AppContextIn
    const [proId, setProId] = useState(0)



    return (
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Codigo Barra</th>
                    <th>Descripción</th>
                    <th className='td-number'>Cantidad</th>
                    <th className='td-number'>Costo</th>
                    <th className='td-number'>Precio Minorista</th>
                    <th className='td-number'>Precio Mayorista</th>
                    <th className='td-number'>Subtotal</th>
                    <th className='td-number'>Estado</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>

            <tbody>
                {
                    context.purchaseProList.map((data, id) => (
                        <tr
                            onClick={() => {
                                context.showFormModal(true)
                                context.setPurchaseProductModify(data)
                                context.handlePurchaseProductMode(true)
                            }}
                            className='td-icon'
                            key={id}>
                            <td className="td-id">{id + 1}</td>
                            <td style={{ width: "200px" }}>{data.barcode}</td>
                            <td>{data.description}</td>

                            <td className='td-number'>{data.amount}</td>
                            <td className='td-number'>{data.salePrice}</td>
                            <td className='td-number'>{data.entryPriceMin}</td>
                            <td className='td-number'>{data.entryPriceMay}</td>
                            <td className='td-number'>{data.subtotal}</td>
                            <td className='td-number'>{data.formDB ? "Guardado" : "No Guardado"}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <MdDeleteOutline
                                    onClick={() => {
                                        if(data.formDB){
                                            setProId(data.id as number)
                                            context.showDeletePurProModal(true)
                                        }else{
                                            context.deletePurchaseProduct(data.id as number)
                                        }
                                    }}
                                />
                                {/* <DeleteProductModal id={productID}/> */}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <DeletePurchaseProductModal
                proId={proId}
            />
        </table>
    )
}

export default PurchaseProductDetailTable