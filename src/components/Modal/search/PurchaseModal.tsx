import { Dialog } from "primereact/dialog"
import { ReactNode, useEffect, useState } from "react"
import { AppContextIn, DropdownItem, ProductPost } from "../../../Interface/InApp"
import { useAppContext } from "../../../context/AppContext"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import { getProductByBarcodeRequest, postProductRequest } from "../../../services/Product.service"
import { getCategoryProRequest } from "../../../services/category.service"
import CategoryFormModal from "../form/CategoryFormModal"

interface ContexArg {
    showthisModal: boolean
    setThisModal: (val: boolean) => void
}

function PurchaseProductFormModal(prop: ContexArg) {


    const context = useAppContext() as AppContextIn

    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [entryPriceMin, setEntryPrice] = useState(0);
    const [entryPriceEmpty, setEntryPriceEmpty] = useState(false);

    const [entryPriceMay, setEntryPriceMay] = useState(0);

    const [salePrice, setSalePrice] = useState(0);
    const [salePriceEmpty, setSalePriceEmpty] = useState(false);

    const [barcode, setBarcode] = useState("");
    const [barcodeEmpty, setBarcodeEmpty] = useState(false);

    const [stock, setStock] = useState(0);
    // const [stockEmpty, setStockEmpty] = useState(false);

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>()
    const [categoryEmpty, setCategoryEmpty] = useState(false);

    const [CategoryModal, setCategoryModal] = useState(false)

    // const [supplierItems, setSupplierItems] = useState<DropdownItem[]>([]);
    // const [supplierSelect, setsupplierSelect] = useState<DropdownItem | null>(null)
    // const [supplierEmpty, setSupplierEmpty] = useState(false);

    async function verifyBarcode(bar: string) {
        try {
            const res = await getProductByBarcodeRequest(bar)
            if (res.data.length > 0) {
                setBarcodeEmpty(true)
            } else {
                setBarcodeEmpty(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function showCategoryModal(val: boolean) {
        setCategoryModal(val)
    }



    function cleanInput() {
        setDescription("");
        setEntryPrice(0);
        setSalePrice(0);
        setBarcode("");
        setStock(0);
        setcategorySelect(null);
        // setsupplierSelect(null);
        setDescriptionEmpty(false);
        setEntryPriceEmpty(false);
        setSalePriceEmpty(false);
        setCategoryEmpty(false);
    }

    function validateInputs(): boolean {
        let invalid: boolean = false;
        if (description === "") {
            setDescriptionEmpty(true);
            invalid = true;
        } else {
            setDescriptionEmpty(false);
        }
        // if (entryPriceMin == 0) {
        //     setEntryPriceEmpty(true);
        //     invalid = true;
        // } else {
        //     setEntryPriceEmpty(false);
        // }
        if (salePrice == 0) {
            setSalePriceEmpty(true);
            invalid = true;
        } else {
            setSalePriceEmpty(false);
        }
        if (categorySelect == null) {
            setCategoryEmpty(true);
            invalid = true;
        } else {
            setCategoryEmpty(false);
        }
        // if (supplierSelect == null) {
        // setSupplierEmpty(true);
        // invalid = true;
        // } else {
        // setSupplierEmpty(false);
        // }

        return invalid;
    }

    async function getItems() {
        const categories = await getCategoryProRequest()
        // const suppliers = await getSupplierRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.id.toString() })));
        // setSupplierItems(suppliers.data.map((sup: any) => ({ label: sup.name, code: sup.id.toString() })));
    }

    function cancel() {
        cleanInput();
        prop.setThisModal(false);
        context.setProductUpdateMode(false);
    }

    async function hanldeSubmit() {
        const isInvalid = validateInputs();
        if (isInvalid) {
            return;
        }

        const pro: ProductPost = {
            description,
            entryPriceMin,
            entryPriceMay,
            salePrice,
            barcode,
            stock,
            category: {
                id: Number(categorySelect?.code)
            },
            // supplier:{
            //     id: Number(supplierSelect?.code)
            // }
        };

        try {
            await postProductRequest(pro)
            context.productList()
            cancel()
        } catch (error) {
            console.log(error)
        }
        cleanInput();
    }



    useEffect(() => {
        context.setModalFormTitle("Datos del Producto")
        cleanInput();
        if (context.isProductUpdMode) {
            const product = context.productModify;
            setDescription(product.description);
            setEntryPrice(product.entryPriceMin);
            setEntryPriceMay(product.entryPriceMay);
            setSalePrice(product.salePrice);
            setBarcode(product.barcode);
            setStock(product.stock);
            setcategorySelect(
                { label: product.category.name, code: (product.category.id as number) + "" }
            );
            // setsupplierSelect({ 
            //     label: product.supplier.name, code: (product.supplier.id as number)+"" 
            // });
        }
    }, [])
    useEffect(() => {
        getItems();
    }, [])



    return (
        <Dialog header={"Nuevo Producto"} position='top' visible={prop.showthisModal} style={{ marginTop: "50px" }} onHide={() => { context.showFormModal(false) }}>
            <div className='register-form'>
                <section className='person-section' style={{ width: "990px" }}>

                    {/* barcode */}
                    <div style={{ marginTop: "10px" }}>
                        <h4 >Codigo</h4>
                        <InputText
                            value={barcode}
                            onChange={(e) => {
                                setBarcode(e.target.value)
                                verifyBarcode(e.target.value)
                            }}
                            // variant="filled"
                            invalid={barcodeEmpty}
                            type="text"
                            style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        />
                        {barcodeEmpty && <small id="username-help" className='empt-ymsg'> codigo de barra ya registrado</small>}
                    </div>

                    {/* description */}
                    <div style={{ marginTop: "10px" }}>
                        <h4 style={{ marginTop: "10px" }}>Descripción</h4>
                        <InputTextarea
                            value={description}
                            // variant="filled"
                            onChange={(e) => setDescription(e.target.value.toUpperCase())}
                            style={{ marginTop: "5px", width: "100%", height: "100px" }}
                            invalid={descriptionEmpty}
                        />
                        {descriptionEmpty && <small id="username-help" className='empt-ymsg'>La description es requerida</small>}
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <h4 >Precio de compra</h4>
                        <InputNumber
                            value={salePrice}
                            onValueChange={(e) => setSalePrice(e.target.value as number)}
                            // variant="filled"
                            invalid={barcodeEmpty}
                            type="text"
                            style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        />
                        {salePriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de compra es requerido</small>}
                    </div>

                    {/* prices */}
                    <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>

                        <div style={{ width: "48%" }}>
                            <h4>Precio Minorista</h4>
                            <InputNumber
                                // variant="filled"
                                inputId="integeronly"
                                value={entryPriceMin}
                                disabled
                                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                onValueChange={(e) => setEntryPrice(e.value as
                                    number)}
                                invalid={entryPriceEmpty}
                            />
                            {entryPriceEmpty && <small id="username-help" className='empt-ymsg'> El precio de compra es requerido</small>}
                        </div>

                        <div style={{ width: "48%" }}>
                            <h4 style={{ marginTop: "10px" }}>Precio Mayorista</h4>
                            <InputNumber
                                inputId="integeronly"
                                value={entryPriceMay}
                                disabled
                                // variant="filled"
                                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                onValueChange={(e) => setSalePrice(e.value as
                                    number)}
                                invalid={salePriceEmpty}
                            />

                        </div>
                    </div>

                    {/* stock */}
                    <div style={{ marginTop: "10px" }}>
                        <h4 style={{ marginTop: "10px" }}>Stock</h4>
                        <InputNumber
                            inputId="integeronly"
                            // variant="filled"
                            value={stock}
                            disabled
                            style={{ marginTop: "5px", width: "100%", height: "40px" }}
                            onValueChange={(e) => setStock(e.value as number)}
                        />
                    </div>

                    {/* category supplier */}
                    <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>

                        <div style={{ width: "48%" }}>
                            <h4 >Categoria</h4>
                            <Dropdown
                                value={categorySelect}
                                filter
                                // variant="filled"
                                options={categoryItems}
                                onChange={(e: DropdownChangeEvent) => setcategorySelect(e.value)}
                                style={{ width: "100%", height: "40px", marginTop: "5px" }}
                                // options={roles} 
                                placeholder='Seleccionar'
                                className="w-full md:w-14rem"
                                invalid={categoryEmpty}
                            />
                            {categoryEmpty && <small id="username-help" className='empt-ymsg'> La categoria es requerida</small>}
                        </div>
                        <div style={{ width: "48%", marginTop: "28px", display: "flex", marginRight:"30px"}}>
                            <Button
                                type='submit'
                                label="Nueva Categoria"
                                severity="secondary"
                                raised
                                onClick={() => showCategoryModal(true)}
                                size='small'
                                style={{ width: "200px", height: "40px" }}
                            />
                        </div>
                    </div>
                </section>


                {/* buttons */}
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
                        onClick={hanldeSubmit}
                        size='small'
                        style={{ width: "200px" }}
                    />
                </div>
                <CategoryFormModal 
                    getItems={getItems}
                    showthisModal={CategoryModal} 
                    setThisModal={setCategoryModal} 
                    />
            </div>

        </Dialog>

    )
}

export default PurchaseProductFormModal