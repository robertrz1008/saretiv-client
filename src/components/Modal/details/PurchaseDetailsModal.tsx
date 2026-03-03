import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import { AppContextIn } from '../../../Interface/InApp'
import { PurchaseGet, PurchaseProductGet } from '../../../Interface/purchase'
import { Dialog } from 'primereact/dialog'
import { getPurchaseProductByPurchaseRequequest } from '../../../services/purchase.service'

function PurchaseDetailsModal() {

    const context = useAppContext() as AppContextIn
    const [purchase, setPurchase] = useState<PurchaseGet>()
    const [purchaseProducts, setPurchaseProducts] = useState<PurchaseProductGet[]>([])

    async function getPurchasePro(){
        const res = await getPurchaseProductByPurchaseRequequest(context.purchaseModify?.id as number)
        setPurchaseProducts(res.data)
    }

    useEffect(() => {
        if(context.purchaseModify){
                setPurchase(context.purchaseModify as PurchaseGet)
            getPurchasePro()
        }

        
    }, [context.purchaseModify])


  return (
    <Dialog header="Detalles del Soporte" position='center' visible={context.isShowDetailModal} onHide={() => { context.showDetailModal(false) }}>
                <div >
                    <div className='supp-detial-modal'>
                        <section className='details-texts'>
                            <div className='details-texts-item'>
                                <h4>Fecha de emision</h4>
                                <p>{!purchase?.createAt? "Cargando..." : new Date(purchase.createAt).toISOString().slice(0,10)}</p>
                            </div>
                            <div className='details-texts-item'>
                                <h4>Numero de Factura</h4>
                                <p>{!purchase?.factura ? "Cargando..." : purchase?.factura}</p>
                            </div>
                            <div className='details-texts-item'>
                                <h4>Proveedor</h4>
                                <p>{!purchase?.supplier.name ? "Sin fecha" : purchase.supplier.name}</p>
                            </div>
                            <div className='details-texts-item'>
                            <h4>Total</h4>
                            <p>{!purchase?.total? "cargando..." : purchase.total}</p>
                        </div>
                        </section>

                        <section className='detail-table-con'>
                            <h4>Actividades</h4>
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
                                            </tr>
                                        </thead>
                            
                                        <tbody>
                                            {
                                                purchaseProducts.map((data, id) => (
                                                    <tr
                                                        className='td-icon'
                                                        key={id}>
                                                        <td className="td-id">{id + 1}</td>
                                                        <td style={{ width: "200px" }}>{data.product.barcode}</td>
                                                        <td>{data.product.description}</td>
                            
                                                        <td className='td-number'>{data.amount}</td>
                                                        <td className='td-number'>{data.costo}</td>
                                                        <td className='td-number'>{data.priceMin}</td>
                                                        <td className='td-number'>{data.priceMay}</td>
                                                        <td className='td-number'>{data.subtotal}</td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                            
                                    </table>
                        </section>
                        <div style={{height:"50px"}}></div>
                    </div>
                    
                </div>
            </Dialog>
  )
}

export default PurchaseDetailsModal