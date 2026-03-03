import { Button } from 'primereact/button'
import { useEffect } from 'react'
import PurchaseTable from '../../../../components/tables/purchase/PurchaseTable'
import { InputText } from 'primereact/inputtext'
import { useAppContext } from '../../../../context/AppContext'
import { AppContextIn } from '../../../../Interface/InApp'
import { useNavigate } from 'react-router-dom'
import PurchaseDetailsModal from '../../../../components/Modal/details/PurchaseDetailsModal'

function BuyPage() {

    const context = useAppContext() as AppContextIn
    const navigate = useNavigate()

    useEffect(() =>{
        context.setGlobalTitleFn("Compras")
        context.listPurchase()
    }, [])

    return (
        <div className='main-con'>
            <div className='register-con'>
                <div className='register-head'>
                   
                <Button
                    style={{ marginRight: "10px" }}
                    label="Nueva compra"
                    severity="info"
                    size='small'
                        onClick={() => {navigate("/DatosCompra")}}
                />
                </div>
                <PurchaseTable />
                <PurchaseDetailsModal/>
            </div>
        </div>
    )
}

export default BuyPage