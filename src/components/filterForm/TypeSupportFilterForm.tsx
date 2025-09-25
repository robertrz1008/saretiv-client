import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown"
import { useEffect, useState } from "react";
import type { DropdownItem } from "../../Interface/InApp";
import { getCategoryDevRequest } from "../../services/category.service";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import type { SupportTypeParams } from "../../Interface/SupportIn";


interface Prop {
  submitParam: (user: SupportTypeParams) => void
}


function TypeSupportFilterForm(prop: Prop) {


    const [propertyItems, _etPropertyItems] = useState<DropdownItem[]>([
        { label: "Descripcion", code: "ts.description" },
        { label: "Monto", code: "ts.amount" },
    ]);
    const [propertySelect, setPropertySelect] = useState<DropdownItem | null>(null)

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>()

    const [orderItems, _setOrderItems] = useState<DropdownItem[]>([
        { label: "Ascendente A-Z", code: "ASC" },
        { label: "Descendente Z-A", code: "DESC" },
    ]);
    const [orderSelect, setOrderSelect] = useState<DropdownItem | null>(null)

    const [amountMin, setAmountMin] = useState(0)
    const [amountMax, setAmountMax] = useState(0)





    async function getItems() {
        const categories = await getCategoryDevRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.name })));
    }

    async function handleSubmit() {
        const obj: SupportTypeParams = {
            property: propertySelect?.code as string,
            order: orderSelect?.code as string,
            category: categorySelect?.code as string,
            amountMin: amountMin,
            amountMax: amountMax
        }
        prop.submitParam(obj)
    }



    useEffect(() => {
        getItems();
    }, [])





    return (
        <div>
            <>
                <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Parametros</h3>
                <div className="support-form-inputs">
                    {/* category */}
                    <div style={{ marginTop: "10px" }}>
                        <label htmlFor="username" >Categoria</label>
                        <Dropdown
                            value={categorySelect}
                            filter
                            variant="filled"
                            options={categoryItems}
                            onChange={(e: DropdownChangeEvent) => setcategorySelect(e.value)}
                            style={{ width: "100%", height: "40px", marginTop: "5px" }}
                            // options={roles} 
                            placeholder='Seleccionar'
                            className="w-full md:w-14rem"
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <label htmlFor="username" style={{ marginTop: "10px" }}>Ordenar por</label>
                        <Dropdown
                            variant="filled"
                            options={propertyItems}
                            value={propertySelect}
                            onChange={(e: DropdownChangeEvent) => setPropertySelect(e.value)}
                            style={{ width: "100%", height: "40px", marginTop: "5px" }}
                            // key={`customer-${customerSelect?.code || 'empty'}`}
                            placeholder='Seleccionar'
                            className="w-full md:w-14rem"
                        // invalid={customerEmpty}
                        />
                    </div>
                    {/* order */}
                    <div style={{ marginTop: "10px" }}>
                        <label htmlFor="username" style={{ marginTop: "10px" }}>Orden</label>
                        <Dropdown
                            variant="filled"
                            options={orderItems}
                            value={orderSelect}
                            onChange={(e: DropdownChangeEvent) => setOrderSelect(e.value)}
                            style={{ width: "100%", height: "40px", marginTop: "5px" }}
                            // key={`customer-${customerSelect?.code || 'empty'}`}
                            placeholder='Seleccionar'
                            className="w-full md:w-14rem"
                        // invalid={customerEmpty}
                        />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <h4>Precio de Compra</h4>
                        <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "10px" }}>
                            <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
                                <label htmlFor="username" >Minimo</label>
                                <InputNumber
                                    variant="filled"
                                    inputId="integeronly"
                                    value={amountMin}
                                    style={{ marginTop: "5px", width: "100px", height: "40px" }}
                                    onValueChange={(e) => setAmountMin(e.value as
                                        number)}
                                />
                            </div>

                            <div style={{ width: "45%" }}>
                                <label htmlFor="username" style={{ marginTop: "10px" }}>Maximo</label>
                                <InputNumber
                                    inputId="integeronly"
                                    value={amountMax}
                                    variant="filled"
                                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                    onValueChange={(e) => setAmountMax(e.value as number)}
                                />
                            </div>
                        </div>
                    </div>



                    <div style={{ width: "340px", position: "absolute", bottom: "10px", right: "20px" }}>
                        <Button
                            onClick={handleSubmit}
                            label="Filtrar"
                            style={{ width: "100%", marginTop: "10px" }}
                            size="small"
                        />
                    </div>
                </div>
            </>
        </div>
    )
}

export default TypeSupportFilterForm