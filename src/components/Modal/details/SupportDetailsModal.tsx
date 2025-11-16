import { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import { Dialog } from 'primereact/dialog'
import type { SupportCustomGet, SuppProductDetail } from '../../../Interface/SupportIn'
import { getSupportsCustomByIdRequest } from '../../../services/Support.Service'
import { getActivitiesBySupportIdRequest } from '../../../services/Activities.service'
import type { ActivityGet } from '../../../Interface/Activities'
import { getProductDetailBySupportRequest } from '../../../services/Sale.service'

interface Prop {
    suppId: number
}

function SupportDetailsModal(prop: Prop) {

    const context = useAppContext() as AppContextIn
    const [support, setSupport] = useState<SupportCustomGet>()
    const [activities, setActivities] = useState<ActivityGet[]>([])
    const [products, setProducts] = useState<SuppProductDetail[]>([])



    async function getDetails() {
        const res = await getSupportsCustomByIdRequest(prop.suppId)
        setSupport(res.data)

        const activities = await getActivitiesBySupportIdRequest(prop.suppId)
        setActivities(activities.data)

        const product = await getProductDetailBySupportRequest(prop.suppId)
        setProducts(product.data)
    }




    useEffect(() => {
        if (prop.suppId != 0) {
            getDetails()
        }
    }, [prop.suppId])





    return (
        <Dialog header="Detalles del Soporte" position='center' visible={context.isShowDetailModal} onHide={() => { context.showDetailModal(false) }}>
            <div >
                <div className='supp-detial-modal'>
                    <section className='details-texts'>
                        <div className='details-texts-item'>
                            <h4>Nombre del cliente</h4>
                            <p>{!support?.customer ? "Cargando..." : support?.customer}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Técnico Encargado</h4>
                            <p>{!support?.user ? "Cargando..." : support?.user}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Fecha Inicio</h4>
                            <p>{!support?.startDate ? "Sin fecha" : new Date(support.startDate).toISOString().slice(0,10)}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Fecha Fin</h4>
                            <p>{!support?.endDate ? "Sin fecha" : new Date(support.endDate).toISOString().slice(0,10)}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Descripción del dispositivo</h4>
                            <p>{!support?.description ? "Cargando..." : support?.description}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Categoría</h4>
                            <p>{!support?.categoryDev ? "Cargando..." : support?.categoryDev}</p>
                        </div>
                        <div className='details-texts-item'>
                            <h4>Observación</h4>
                            <p>{!support?.observation ? "Cargando..." : support?.observation}</p>
                        </div>
                    </section>

                    <section className='detail-table-con'>
                        <h4>Actividades</h4>
                        <table className="sale-table-con">
                            <thead className="register-thead">
                                <tr>
                                    <th>Descripción</th>
                                    <th className="td-number">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !activities ?
                                        (<tr></tr>) :
                                        activities.map((pro, id) => (
                                            <tr
                                                key={id}
                                                className="sale-table-tr"
                                                style={{ height: "40px", cursor: "auto" }}
                                            >
                                                <td>{pro.supportType.description}</td>
                                                <td className="td-number">{pro.supportType.amount}</td>

                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </section>

                    <section className='detail-table-con'>
                        <h4>Respuestos</h4>
                        <table className="sale-table-con">
                            <thead className="register-thead">
                                <tr>
                                    <th>Descripción</th>
                                    <th className="td-number">Cantidad</th>
                                    <th className="td-number">Monto</th>
                                    <th className="td-number">Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                    {
                        !products ?
                            (<tr></tr>) :
                            products.map((pro, id) => (
                                <tr
                                    key={id}
                                    className="sale-table-tr"
                                    style={{ height: "40px" }}
                                >
                                    <td>{pro.description}</td>
                                    <td className="td-number">{pro.productAmount}</td>
                                    <td className="td-number">{pro.price}</td>
                                    <td className="td-number">{pro.subtotal}</td>
                                </tr>
                            ))
                    }
                </tbody>
                        </table>
                    </section>

                    <div className='details-texts-item'>
                        <h4>Total</h4>
                        <p>{!support?.total? "cargando..." : support.total}</p>
                    </div>
                    <div style={{height:"50px"}}></div>
                </div>
                
            </div>
        </Dialog>
    )
}

export default SupportDetailsModal