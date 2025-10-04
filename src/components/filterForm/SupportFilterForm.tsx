import React, { useEffect, useState } from 'react'
import type { Customer, DropdownItem } from '../../Interface/InApp';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { getCategoryDevRequest } from '../../services/category.service';
import { customerListRequest } from '../../services/Customer.service';
import type { AxiosResponse } from 'axios';
import type { User } from '../../Interface/InAuth';
import { usersListRequest } from '../../services/Auth.service';
import type { SupportParams } from '../../Interface/SupportIn';

interface Prop {
  submitParam: (param: SupportParams) => void
}


function SupportFilterForm(prop: Prop) {

    const [customerItems, setCustomeItems] = useState<DropdownItem[]>([]);
    const [customeSelect, setCustomeSelect] = useState<DropdownItem | null>()

    const [technicalItems, setTechnicalItems] = useState<DropdownItem[]>([]);
    const [technicalSelect, setTechnicalSelect] = useState<DropdownItem | null>()

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>()

    const [propertyItems, _etPropertyItems] = useState<DropdownItem[]>([
        { label: "Dispositivo", code: "y" },
        { label: "Cliente", code: "n" },
        { label: "Fecha Inicio", code: "n" },
        { label: "Fecha Fin", code: "n" },
        { label: "Monto Total", code: "n" },
    ]);
    const [propertySelect, setPropertySelect] = useState<DropdownItem | null>(null)


    const [orderItems, _setOrderItems] = useState<DropdownItem[]>([
        { label: "Ascendente A-Z", code: "ASC" },
        { label: "Descendente Z-A", code: "DESC" },
    ]);
    const [orderSelect, setOrderSelect] = useState<DropdownItem | null>(null)

    const [dateFrom, setDateFrom] = useState<Date>()
    const [dateTo, setDateTo] = useState<Date>()

    const [totalMin, setTotalMin] = useState(0)
    const [totalMax, setTotalMax] = useState(0)







    async function getItems(){
       const categories = await getCategoryDevRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.id.toString() }))); 

        const customer = await customerListRequest()
        setCustomeItems(customer.data.map((sup: Customer) => ({ label: sup.name, code: (sup.id as number).toString() })));

        const technical: AxiosResponse<User[]> = await usersListRequest()
        const newTechnical = technical.data.filter(tech => tech.roles[0].name == "TECNICO")
        setTechnicalItems(newTechnical.map(cat => ({
            label: cat.name+" "+cat.lastname, 
            code: (cat.id as number).toString() 
        })))
    }
    async function handleSubmit(){
        const params: SupportParams = {
            customerId: Number(customeSelect?.code as string),
            technicalId: Number(technicalSelect?.code as string), 
            categoryId: Number(categorySelect?.code as string),
            property: propertySelect?.code as string,
            order: orderSelect?.code as string,
            totalMin: totalMin,
            totalMax: totalMax,
            dateFrom: dateFrom?.toISOString().slice(0,10) as string,
            dateTo: dateTo?.toISOString().slice(0,10) as string,
        }
        prop.submitParam(params)
    }




    useEffect(() => {
        getItems()
    }, [])



    return (
        <>
            <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Parametros</h3>
            <div className="filter-form-inputs">
                {/* customer */}
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="username" >Cliente</label>
                    <Dropdown
                        value={customeSelect}
                        filter
                        variant="filled"
                        options={customerItems}
                        onChange={(e: DropdownChangeEvent) => setCustomeSelect(e.value)}
                        style={{ width: "100%", height: "40px", marginTop: "5px" }}
                        // options={roles} 
                        placeholder='Seleccionar'
                        className="w-full md:w-14rem"
                    />
                </div>
                {/* technical */}
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="username" >Tecnico</label>
                    <Dropdown
                        value={technicalSelect}
                        filter
                        variant="filled"
                        options={technicalItems}
                        onChange={(e: DropdownChangeEvent) => setTechnicalSelect(e.value)}
                        style={{ width: "100%", height: "40px", marginTop: "5px" }}
                        placeholder='Seleccionar'
                        className="w-full md:w-14rem"
                    />
                </div>
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
                    <h4>Monto Total</h4>
                    <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "5px" }}>
                        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
                            <label htmlFor="username" >Minimo</label>
                            <InputNumber
                                variant="filled"
                                inputId="integeronly"
                                value={totalMin}
                                style={{ marginTop: "5px", width: "100px", height: "40px" }}
                                onValueChange={(e) => setTotalMin(e.value as
                                    number)}
                            />
                        </div>

                        <div style={{ width: "45%" }}>
                            <label htmlFor="username" style={{ marginTop: "10px" }}>Maximo</label>
                            <InputNumber
                                inputId="integeronly"
                                value={totalMax}
                                variant="filled"
                                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                                onValueChange={(e) => setTotalMax(e.value as
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
                                style={{ height: "40px", marginTop: "5px", width: "200px" }}
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

export default SupportFilterForm