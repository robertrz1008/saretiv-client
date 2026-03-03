import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { AppContextIn, DropdownItem } from '../../Interface/InApp';
import { getSupplierRequest } from '../../services/Supplier.service';
import { useAppContext } from '../../context/AppContext';
import { Calendar } from 'primereact/calendar';


interface Prop{
    addPurchate: (obj: {factura: string, supplier:DropdownItem, date: Date}) => void
}

function PurchaseDates({addPurchate}: Prop) {

    const context = useAppContext() as AppContextIn

    const [supplierItems, setSupplierItems] = useState<DropdownItem[]>([]);
    const [supplierSelect, setsupplierSelect] = useState<DropdownItem | null>(null)
    const [supplierEmpty, _setSupplierEmpty] = useState(false);

    const [factura, setFactura] = useState<string>()

    const [datePurchase, setDatePurchase] = useState<Date | null>(null)

    async function getItems() {
        const suppliers = await getSupplierRequest()
        setSupplierItems(suppliers.data.map((sup: any) => ({ label: sup.name, code: sup.id.toString() })));
    }

    useEffect(() => {
        getItems()
    }, [])
    useEffect(() => {
        context.sumPurchaseTotal()
    }, [context.purchaseProList])

    useEffect(() => {
        if (supplierSelect && factura && datePurchase) {
            addPurchate({
                factura: factura.toString(),
                supplier: supplierSelect,
                date: new Date()
            })
        }
    }, [supplierSelect, factura, datePurchase])

    useEffect(() => {
        if(context.purchaseModify){
            context.changePurchaseProductForTable()
            setsupplierSelect({label: context.purchaseModify.supplier.name, code: (context.purchaseModify.supplier.id as number).toString()})
            setFactura(context.purchaseModify.factura)
            setDatePurchase(new Date(context.purchaseModify.createAt))
        }
    }, [context.purchaseModify])




    return (
        <div className='register-con'>
            <div className='register-form ' style={{ width: "100%" }}>
                <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>

                    <div style={{ width: "31%" }}>
                        <p>Fecha de Emesíon</p>
                        <Calendar
                            id="buttondisplay"
                            value={datePurchase}
                            onChange={(e) => {
                                setDatePurchase(e.target.value as Date)
                            }}
                            showIcon
                            variant="filled"
                            style={{ height: "40px", marginTop: "5px" }}
                        />
                        {/* {entryPriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de compra es requerido</small>} */}
                    </div>

                    <div style={{ width: "31%" }}>
                        <p style={{ marginTop: "2x" }}>Numero de Factura</p>
                        <InputMask
                            value={factura}
                            variant="filled"
                            style={{ marginTop: "3px", width: "100%", height: "40px" }}
                            mask="999-999-9999999"
                            onChange={(e: InputMaskChangeEvent) => setFactura(e.target.value as string)}
                        // invalid={salePriceEmpty}
                        />
                        {/* {salePriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de venta es requerido</small>} */}
                    </div>
                    <div style={{ width: "31%" }}>
                        <h4>Proveedor</h4>
                        <Dropdown
                            // variant="filled"
                            filter
                            options={supplierItems}
                            variant="filled"
                            onChange={(e: DropdownChangeEvent) => setsupplierSelect(e.value)}
                            style={{ width: "100%", height: "40px", marginTop: "5px" }}
                            value={supplierSelect}
                            placeholder='Seleccionar'
                            className="w-full md:w-14rem"
                            invalid={supplierEmpty}
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default PurchaseDates