import { useEffect, useState } from "react"
import type { DropdownItem } from "../../Interface/InApp";
import { getCategoryProRequest } from "../../services/category.service";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import type { SaleParams } from "../../Interface/SalesInterfaces";


interface Prop {
  submitParam: (param: SaleParams) => void
}


function SalesFilterForm(prop: Prop) {

    const [dateFrom, setDateFrom] = useState<Date>()
    const [dateTo, setDateTo] = useState<Date>()

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>()

    const [salePriceMin, setSalePriceMin] = useState(0)
    const [salePriceMax, setSalePriceMax] = useState(0)

    const [propertyItems, _etPropertyItems] = useState<DropdownItem[]>([
        { label: "Descripción", code: "pro.description" },
        { label: "Precio de venta", code: "pro.entry_price" },
        { label: "Subtotal", code: "pro.entry_sale" }
    ]);
    const [propertySelect, setPropertySelect] = useState<DropdownItem | null>(null)

    const [orderItems, _setOrderItems] = useState<DropdownItem[]>([
        { label: "Ascendente A-Z", code: "ASC" },
        { label: "Descendente Z-A", code: "DESC" },
    ]);
    const [orderSelect, setOrderSelect] = useState<DropdownItem | null>(null)






    async function getCategoryItems() {
        const categories = await getCategoryProRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.name })));
    }

    async function handleSubmit(){
        const params: SaleParams = {
            category: categorySelect?.code as string,
            property: propertySelect?.code as string,
            order: orderSelect?.code as string,
            dateFrom: dateFrom?.toISOString().slice(0,10) as string,
            dateTo: dateTo?.toISOString().slice(0,10) as string,
            subtotalMax: salePriceMax,
            subtotalMin: salePriceMin
        }
        prop.submitParam(params)
    }

    


    useEffect(() => {
        getCategoryItems()
    }, [])



    return (
        <>
            <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Parametros</h3>
            <div className="filter-form-inputs">
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

                {/* order by */}
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
                    <h4>Precio de Venta</h4>
                    <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "5px" }}>
                        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
                            <label htmlFor="username" >Minimo</label>
                            <InputNumber
                                variant="filled"
                                inputId="integeronly"

                                value={salePriceMin}
                                style={{ marginTop: "5px", width: "100px", height: "40px" }}
                                onValueChange={(e) => setSalePriceMin(e.value as
                                    number)}
                            />
                        </div>

                        <div style={{ width: "45%" }}>
                            <label htmlFor="username" style={{ marginTop: "10px" }}>Maximo</label>
                            <InputNumber
                                inputId="integeronly"
                                value={salePriceMax}
                                variant="filled"
                                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                onValueChange={(e) => setSalePriceMax(e.value as
                                    number)}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <h4>Fecha</h4>
                    <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "5px" }}>
                        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
                            <label htmlFor="username" >Desde</label>
                            <Calendar
                                id="buttondisplay"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value as Date)}
                                showIcon
                                variant="filled"
                                style={{ height: "40px", marginTop: "5px", width:"200px"}}
                            />
                        </div>

                        <div style={{ width: "45%" }}>
                            <label htmlFor="username" style={{ marginTop: "10px" }}>Hasta</label>
                            <Calendar
                                id="buttondisplay"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value as Date)}
                                showIcon
                                variant="filled"
                                style={{ height: "40px", marginTop: "5px" }}
                            />
                            
                        </div>
                    </div>
                </div>


                <div style={{ width: "340px", position: "absolute", bottom: "5px", right: "20px" }}>
                    <Button
                        onClick={handleSubmit}
                        label="Filtrar"
                        style={{ width: "100%", marginTop: "10px" }}
                        size="small"
                    />
                </div>
            </div>
        </>
    )
}

export default SalesFilterForm