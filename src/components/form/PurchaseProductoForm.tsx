import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { AppContextIn, Category, ProductForPurchase } from '../../Interface/InApp'
import { InputText } from 'primereact/inputtext'
import { updateProductRequest } from '../../services/Product.service'
import { getPurchaseProductRequequest, updatePurchaseRequequest } from '../../services/purchase.service'
import { PurchaseProductGet } from '../../Interface/purchase'
import { AxiosResponse } from 'axios'

interface Prop {
    newProductModal: (val: boolean) => void
    modalShow: (val: boolean) => void
}

function PurchaseProductoForm(prop: Prop) {
    const context = useAppContext() as AppContextIn

    const [btnNewProDisabled, setBtnNewProDisabled] = useState(false)
    const [btnSelectProDisabled, setBtnSelectProDisabled] = useState(false)
    const [priceMayDisabled, setPriceMayDisabled] = useState(true)
    const [priceMinDisabled, setpriceMayDisabled] = useState(true)
    const [amountDisabled, setAmountDisabled] = useState(true)
    const [costoDisabled, setCostoDisabled] = useState(true)

    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [entryPriceMin, setEntryPrice] = useState(0);
    const [entryPriceEmpty, setEntryPriceEmpty] = useState(false);

    const [entryPriceMay, setEntryPriceMay] = useState(0);

    const [salePrice, setSalePrice] = useState(0);
    const [salePriceEmpty, setSalePriceEmpty] = useState(false);

    const [stock, setStock] = useState(0);

    const [amount, setAmount] = useState(0);
    const [amountEmpty, setAmountEmpty] = useState(false);




    function calculatingPrices(amount: number) {
        setEntryPrice((amount + (amount * (30 / 100))))
        setEntryPriceMay((amount + (amount * (10 / 100))))
    }

    function cancel() {
        setDescription("")
        setEntryPrice(0)
        setSalePrice(0)
        setEntryPrice(0)
        setEntryPriceMay(0)
        setStock(0)
        setBtnNewProDisabled(false)
        setBtnSelectProDisabled(false)
        context.selectProductToPurchase(null)
        context.showFormModal(false)
        context.handlePurchaseProductMode(false)

    }

    function validateInputs() {
        let invalid: boolean = false;
        if (description === "") {
            setDescriptionEmpty(true);
            invalid = true;
        } else {
            setDescriptionEmpty(false);
        }
        if (salePrice == 0) {
            setSalePriceEmpty(true);
            invalid = true;
        } else {
            setSalePriceEmpty(false);
        }
        if (amount == 0) {
            setAmountEmpty(true);
            invalid = true;
        } else {
            setAmountEmpty(false);
        }
        if (entryPriceMin == 0) {
            setEntryPriceEmpty(true);
            invalid = true;
        } else {
            setEntryPriceEmpty(false);
        }
        return invalid;
    }

    async function updatePurchaseProduct(){
        if (context.purchaseProModify?.formDB) {
                await context.modifyPurchaseFromDB(context.purchaseProModify.id as number, {
                    amount: amount,
                    costo: salePrice,
                    priceMin: entryPriceMin,
                    priceMay: entryPriceMay,
                    product: { id: context.purchaseProSelected?.id as number },
                    purchase: { id: context.purchaseProModify.id as number },
                    subtotal: amount * salePrice
                })
            }
            // modificando los detalles del producto en la lista para mostrar en la tabla
            context.modifyPurchaseProductFromCache(
                context.purchaseProModify?.id as number,
                amount,
                salePrice,
                entryPriceMay,
                entryPriceMin
            )
            
            //obtienedo el nuevo total para modificar
            const purpro: AxiosResponse<PurchaseProductGet[]> = await getPurchaseProductRequequest()
            const productCreated: PurchaseProductGet | undefined = purpro.data.find(p => p.id == context.purchaseProModify?.id)
            const newList = context.purchaseProList.map(p => {
                if(p.id == productCreated?.id) {
                    return {
                        ...p,
                        subtotal: productCreated?.subtotal,
                    }
                }
                return p
            })
            const newPurchaseTotal = newList.reduce((con, el) => con + (el.subtotal as number), 0)

            await updatePurchaseRequequest(context.purchaseModify?.id as number, {
                id:2,
                createAt: new Date(),
                factura:"f",
                editable:true,
                supplier: {id: 0},
                total: newPurchaseTotal
            })
            cancel()
    }

    function handleSubmit() {
        const isInvalid = validateInputs();
        if (isInvalid) return;
        //veficar si es para modificar o registrar un nuevo producto
        if (context.purchaseProMode) {
            // modificando los detalles del producto guardada en la base de datos
            updatePurchaseProduct()

        } else {

            context.handlePurchaseProductList({
                id: context.purchaseProSelected?.id as number,
                description: description,
                salePrice: salePrice,
                entryPriceMin: entryPriceMin,
                entryPriceMay: entryPriceMay,
                stock: context.purchaseProSelected?.stock as number,
                barcode: context.purchaseProSelected?.barcode as string,
                category: context.purchaseProSelected?.category as Category,
                amount: amount,
                subtotal: amount * salePrice,
                formDB: false
            })
            cancel()
        }
        
    }



    useEffect(() => {
        if (context.purchaseProMode) {
            setBtnNewProDisabled(true)
            setBtnSelectProDisabled(true)
            setAmount(context.purchaseProModify?.amount as number)
            setDescription(context.purchaseProModify?.description as string)
            setEntryPrice(context.purchaseProModify?.entryPriceMin as number)
            setEntryPriceMay(context.purchaseProModify?.entryPriceMay as number)
            setSalePrice(context.purchaseProModify?.salePrice as number)
            setStock(context.purchaseProModify?.stock as number)

            setPriceMayDisabled(false)
            setpriceMayDisabled(false)
            setAmountDisabled(false)
            setCostoDisabled(false)
        }
    }, [])

    useEffect(() => {

        if (!context.purchaseProSelected) return

        setDescription(context.purchaseProSelected.description)
        setEntryPrice(context.purchaseProSelected.entryPriceMin)
        setSalePrice(context.purchaseProSelected.salePrice)
        setStock(context.purchaseProSelected.stock)
        calculatingPrices(context.purchaseProSelected.salePrice)

        setPriceMayDisabled(false)
        setpriceMayDisabled(false)
        setAmountDisabled(false)
        setCostoDisabled(false)

    }, [context.purchaseProSelected])




    return (
        <div className='register-form' style={{ width: "990px" }}>
            <Button
                label="Buscar Producto"
                size='small'
                disabled={btnSelectProDisabled}
                severity="secondary"
                onClick={() => prop.modalShow(true)}
                style={{ marginRight: "10px", width: "200px" }}
            />
            <Button
                label="Crear Producto"
                size='small'
                disabled={btnNewProDisabled}
                severity="success"
                onClick={() => prop.newProductModal(true)}
                style={{ marginRight: "10px", width: "200px" }}
            />

            <div style={{ marginTop: "10px" }}>
                <h4 style={{ marginTop: "10px" }}>Descripción</h4>
                <InputText
                    value={description}
                    // variant="filled"
                    onChange={(e) => setDescription(e.target.value.toUpperCase())}
                    disabled
                    style={{ marginTop: "5px", width: "100%" }}
                    invalid={descriptionEmpty}
                />
                {descriptionEmpty && <small id="username-help" className='empt-ymsg'>La description es requerida</small>}
            </div>
            <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>

                <div style={{ width: "48%" }}>
                    <h4>stock actual</h4>
                    <InputNumber
                        // variant="filled"
                        inputId="integeronly"
                        disabled
                        value={stock}
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        onValueChange={(e) => setAmount(e.value as
                            number)}
                    />
                    {/* // {entryPriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de compra es requerido</small>} */}
                </div>

                <div style={{ width: "48%" }}>
                    <h4>Cantidad agregada</h4>
                    <InputNumber
                        inputId="integeronly"
                        value={amount}
                        disabled={amountDisabled}
                        // variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        onValueChange={(e) => setAmount(e.value as number)}
                        invalid={amountEmpty}
                    />
                    {amountEmpty && <small id="username-help" className='empt-ymsg'> La cantidad es requerida</small>}
                </div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <h4 style={{ marginTop: "10px" }}>Costo por Unidad</h4>
                <InputNumber
                    value={salePrice}
                    disabled={amountDisabled}
                    // variant="filled"
                    onValueChange={(e) => {
                        setSalePrice(e.target.value as number)
                        calculatingPrices(e.target.value as number)
                    }}
                    style={{ width: "100%" }}
                    invalid={salePriceEmpty}
                />
                {salePriceEmpty && <small id="username-help" className='empt-ymsg'>El costo es requerida</small>}
            </div>
            <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>

                <div style={{ width: "48%" }}>
                    <h4>Precio Minorista</h4>
                    <InputNumber
                        // variant="filled"
                        inputId="integeronly"
                        value={entryPriceMin}
                        disabled={priceMinDisabled}
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        onValueChange={(e) => setEntryPrice(e.value as
                            number)}
                        invalid={entryPriceEmpty}
                    />
                    {entryPriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de venta es requerido</small>}
                </div>

                <div style={{ width: "48%" }}>
                    <h4 style={{ marginTop: "10px" }}>Precio Mayorista</h4>
                    <InputNumber
                        inputId="integeronly"
                        value={entryPriceMay}
                        // variant="filled"
                        disabled={priceMayDisabled}
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        onValueChange={(e) => setEntryPriceMay(e.value as
                            number)}
                    />

                </div>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button
                    label="Cancelar" outlined
                    size='small'
                    onClick={() => cancel()}
                    style={{ marginRight: "10px", width: "200px" }} />
                <Button
                    type='submit'
                    label="Guardar"
                    raised
                    onClick={handleSubmit}
                    size='small'
                    style={{ width: "200px" }}
                />
            </div>
        </div>
    )
}

export default PurchaseProductoForm