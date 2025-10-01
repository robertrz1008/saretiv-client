import type { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'

function SalesTable() {

  const context = useAppContext() as AppContextIn

 return (
            <table>
                <thead className="register-thead">
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Fecha</th>
                        <th className="td-number">Precio</th>
                        <th className="td-number">Cantidad</th>
                        <th className='td-number'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !context.salesList ?
                            (<tr></tr>) :
                            context.salesList.map((pro, id) => (
                                <tr
                                    key={id}
                                >
                                    <td>{pro.description}</td>
                                    <td>{pro.category}</td>
                                    <td>{new Date(pro.date).toISOString().slice(0,10)}</td>
                                    <td className="td-number">{pro.price}</td>
                                    <td className="td-number">{pro.amount}</td>
                                    <td className="td-number">{pro.subtotal}</td>
                                    
                                </tr>
                            ))
                    }
                </tbody>
            </table>
    )
}

export default SalesTable