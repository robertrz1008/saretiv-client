import { Button } from 'primereact/button'
import PurchaseProductDetailTable from '../tables/purchase/PurchaseProductDetailTable'
import { useAppContext } from '../../context/AppContext'
import { AppContextIn } from '../../Interface/InApp'



function PurchaseProductDetail() {
    const context = useAppContext() as AppContextIn
    return (
        <div className='register-con'>
            <div className="total-con">

                <h2>TOTAL: </h2><h2>{context.purchaseTotal}</h2>
            </div>
            <div style={{width:"100%", marginTop:"10px"}}>
                <Button
                style={{ marginRight: "10px" }}
                label="Agregar Producto"
                onClick={() => context.showFormModal(true)}
                severity="success"
                size='small'
            />
            </div>
            <PurchaseProductDetailTable/>
            
        </div>
    )
}

export default PurchaseProductDetail