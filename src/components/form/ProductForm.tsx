import React, { useEffect, useState } from 'react'
import type { DropdownItem, AppContextIn, ProductPost } from '../../Interface/InApp'
import { useAppContext } from '../../context/AppContext'
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { getCategoryProRequest } from '../../services/category.service';
import { getSupplierRequest } from '../../services/Supplier.service';
import { postProductRequest, updateProductRequest } from '../../services/Product.service';

function ProductForm() {

    const context = useAppContext() as AppContextIn

    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    
    const [entryPrice, setEntryPrice] = useState(0);
    const [entryPriceEmpty, setEntryPriceEmpty] = useState(false);

    const [salePrice, setSalePrice] = useState(0);
    const [salePriceEmpty, setSalePriceEmpty] = useState(false);

    const [barcode, setBarcode] = useState("");
    // const [barcodeEmpty, setBarcodeEmpty] = useState(false);

    const [stock, setStock] = useState(0);
    // const [stockEmpty, setStockEmpty] = useState(false);

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>(null)
    const [categoryEmpty, setCategoryEmpty] = useState(false);

    const [supplierItems, setSupplierItems] = useState<DropdownItem[]>([]);
    const [supplierSelect, setsupplierSelect] = useState<DropdownItem | null>(null)
    const [supplierEmpty, setSupplierEmpty] = useState(false);




    function cleanInput(){
        setDescription("");
        setEntryPrice(0);
        setSalePrice(0);
        setBarcode("");
        setStock(0);
        setcategorySelect(null);
        setsupplierSelect(null);
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
        if (entryPrice == 0) {
        setEntryPriceEmpty(true);
        invalid = true;
        } else {
        setEntryPriceEmpty(false);
        }
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
        if (supplierSelect == null) {
        setSupplierEmpty(true);
        invalid = true;
        } else {
        setSupplierEmpty(false);
        }

        return invalid;
    }    

    async function getItems() {
        const categories = await getCategoryProRequest()
        const suppliers = await getSupplierRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.id.toString() }))); 
        setSupplierItems(suppliers.data.map((sup: any) => ({ label: sup.name, code: sup.id.toString() })));
    }

    function cancel() {
        cleanInput();
        context.showFormModal(false);
        context.setProductUpdateMode(false);
    }

    async function hanldeSubmit() {
        const isInvalid = validateInputs();
        if (isInvalid) {
            return; 
        }

        const pro: ProductPost = {
            description,
            entryPrice,
            salePrice,
            barcode,
            stock,
            category: {
                id: Number(categorySelect?.code)
            },
            supplier:{
                id: Number(supplierSelect?.code)
            }
        };

        try {
            if( context.isProductUpdMode) {
                await updateProductRequest(context.productModify.id as number, pro);
            }
            else {
                await postProductRequest(pro)
            }
            context.productList()
            cancel()
        } catch (error) {
            console.log(error)
        }
        cleanInput();
    }



 useEffect(() => {
    cleanInput();
    if (context.isProductUpdMode) {
        const product = context.productModify;
        setDescription(product.description);
        setEntryPrice(product.entryPrice);
        setSalePrice(product.salePrice);
        setBarcode(product.barcode);
        setStock(product.stock);
        setcategorySelect(
            { label: product.category.name, code: (product.category.id as number)+"" }
        );
        setsupplierSelect({ 
            label: product.supplier.name, code: (product.supplier.id as number)+"" 
        });
    }
  },[])
    useEffect(() => {
        getItems();
    }, [])




  return (
    <div className='register-form'>
        <section className='person-section' style={{ width: "470px" }}>
            {/* description */}
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Descripción</label>
                    <InputTextarea 
                        value={description} 
                        variant="filled"
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ marginTop: "5px", width: "100%", height: "100px" }}    
                        invalid={descriptionEmpty} 
                    />
                {descriptionEmpty &&  <small id="username-help" className='empt-ymsg'>La description es requerida</small>}
            </div>

            {/* prices */}
             <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width:"100%", marginTop: "10px" }}>
                              
                                <div style={{ width: "48%" }}>
                                    <label htmlFor="username" >Precio de Compra</label>
                                    <InputNumber
                                        variant="filled"
                                        inputId="integeronly" 
                                        value={entryPrice} 
                                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                        onValueChange={(e) => setEntryPrice(e.value as 
                                        number)} 
                                        invalid={entryPriceEmpty}
                                    />
                                    {entryPriceEmpty &&  <small id="username-help" className='empt-ymsg'> El precio de compra es requerido</small>}
                                </div>
                    
                                <div style={{ width: "48%" }}>
                                  <label htmlFor="username" style={{ marginTop: "10px" }}>Precio de Venta</label>
                                  <InputNumber
                                        inputId="integeronly" 
                                        value={salePrice} 
                                        variant="filled"
                                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                        onValueChange={(e) => setSalePrice(e.value as 
                                        number)} 
                                        invalid={salePriceEmpty}
                                    />
                                    {salePriceEmpty &&  <small id="username-help" className='empt-ymsg'> El precio de venta es requerido</small>}
                                </div>
            </div>

            {/* barcode */}
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" >Codigo</label>
                <InputText
                    value={barcode} 
                    onChange={(e) => setBarcode(e.target.value)}
                    variant="filled"
                    type="text" 
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                />
            </div>

            {/* stock */}
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Stock</label>
                <InputNumber
                    inputId="integeronly" 
                    variant="filled"
                    value={stock} 
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                    onValueChange={(e) => setStock(e.value as number)}
                />
            </div>

            {/* category supplier */}
             <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                              
                <div style={{ width: "48%" }}>
                    <label htmlFor="username" >Categoria</label>
                    <Dropdown 
                        value={categorySelect}
                        filter
                        variant="filled"
                        options={categoryItems}
                        onChange={(e: DropdownChangeEvent) =>setcategorySelect(e.value) }
                        style={{width:"100%", height: "40px", marginTop: "5px"}}
                        // options={roles} 
                        placeholder='Seleccionar'
                        className="w-full md:w-14rem" 
                        invalid={categoryEmpty}
                    />
                    {categoryEmpty &&  <small id="username-help" className='empt-ymsg'> La categoria es requerida</small>}
                </div>
                    
                <div style={{ width: "48%" }}>
                    <label htmlFor="username" style={{ marginTop: "10px" }}>Proveedor</label>
                    <Dropdown 
                        variant="filled"
                        filter
                        options={supplierItems}
                        onChange={(e: DropdownChangeEvent) =>setsupplierSelect(e.value) }
                        style={{width:"100%", height: "40px", marginTop: "5px"}}
                        value={supplierSelect} 
                        placeholder='Seleccionar'
                        className="w-full md:w-14rem"
                        invalid={supplierEmpty}
                    />
                    {supplierEmpty &&  <small id="username-help" className='empt-ymsg'> El proveedor es requerido</small>}
                </div>
            </div>
        </section>


        {/* buttons */}
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button
                label="Cancelar" outlined 
                size='small' 
                onClick={() => cancel()}
                style={{ marginRight: "10px" }} 
            />
            <Button 
                type='submit'
                label="Guardar" 
                raised 
                onClick={() => hanldeSubmit()}
                size='small'
            />
        </div>
    </div>
  )
}

export default ProductForm