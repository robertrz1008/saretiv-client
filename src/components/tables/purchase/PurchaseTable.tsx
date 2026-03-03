import { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom'

function PurchaseTable() {

    const context = useAppContext() as AppContextIn
    const navigate = useNavigate()
    return (
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Proveedor</th>
                    <th>Numero Factura</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th className='td-number'>Total</th>
                </tr>
            </thead>

            {
                !context.purchaseList ? (<h3 ></h3>) : (
                    <tbody>
                        {
                            context.purchaseList.map((data, id) => (
                                <tr
                                    className='td-icon'
                                    onClick={() => {
                                        if (data.editable == "FINALIZADO") {
                                            context.handlePurchaseModity(data)
                                            context.showDetailModal(true)
                                            context.handlePurchaseProductMode(true)
                                        } else {
                                            navigate(`/DatosCompra`)
                                            context.handlePurchaseModity(data)
                                            context.handlePurchaseProductMode(true)
                                        }
                                    }}
                                    key={id}
                                >
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.supplier.name}</td>
                                    <td>{data.factura}</td>
                                    <td>{new Date(data.createAt).toISOString().slice(0, 10)}</td>
                                    <td>{data.editable}</td>
                                    <td className='td-number'>{data.total}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                )
            }

        </table>
    )
}

export default PurchaseTable