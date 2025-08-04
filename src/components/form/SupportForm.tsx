import { useEffect, useState } from "react";
import type { DropdownItem } from "../../Interface/InApp";
import { customerListRequest } from "../../services/Customer.service";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { getCategoryDevRequest } from "../../services/category.service";
import { usersListRequest } from "../../services/Auth.service";
import type { User } from "../../Interface/InAuth";
import type { AxiosResponse } from "axios";
import { Button } from "primereact/button";

function SupportForm() {

    const [customerItems, setCustomerItems] = useState<DropdownItem[]>([]);
    const [customerSelect, setcustomerSelect] = useState<DropdownItem | null>(null)
    const [customerEmpty, setCustomerEmpty] = useState(false);

    const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
    const [categorySelect, setcategorySelect] = useState<DropdownItem | null>(null)
    const [categoryEmpty, setCategoryEmpty] = useState(false);

    const [technicalItems, setTechnicalItems] = useState<DropdownItem[]>([]);
    const [technicalSelect, setTechnicalSelect] = useState<DropdownItem | null>(null)
    const [technicalEmpty, setTechnicalEmpty] = useState(false);

    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [observation, setObservation] = useState("");
    const [observationEmpty, setObservationEmpty] = useState(false);





    async function getItems(){
        const customer = await customerListRequest()
        setCustomerItems(
            customer.data.map((cus: any) => ({
                 label: cus.name+" "+cus.lastname, 
                 code: cus.id.toString() 
            }
        )))

        const categories = await getCategoryDevRequest()
        setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.id.toString() }))); 

        const technical: AxiosResponse<User[]> = await usersListRequest()
        const newTechnical = technical.data.filter(tech => tech.roles[0].name == "TECNICO")
        setTechnicalItems(newTechnical.map(cat => ({
            label: cat.name+" "+cat.lastname, 
            code: (cat.id as number).toString() 
        })))
    }
    function validateInputs(){
        let invalid: boolean

        if (description === "") {
            setDescriptionEmpty(true);
            invalid = true;
        } else {
            setDescriptionEmpty(false);
        }

         if (observation === "") {
            setObservationEmpty(true);
            invalid = true;
        } else {
            setObservationEmpty(false);
        }

        if (categorySelect == null) {
            setCategoryEmpty(true);
        invalid = true;
        } else {
            setCategoryEmpty(false);
        }

        if (technicalSelect == null) {
            setTechnicalEmpty(true);
        invalid = true;
        } else {
            setTechnicalEmpty(false);
        }

        if (customerSelect == null) {
            setCustomerEmpty(true);
        invalid = true;
        } else {
            setCustomerEmpty(false);
        }
    }



    useEffect(() => {
        getItems()
    }, [])


  return (
    <>
        <h3 style={{position: "absolute", top:"25px", zIndex:"2"}}>Datos del Soporte</h3>
            <div className="support-form-inputs">
            {/* customer */}
            <div style={{ width: "100%" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Cliente</label>
                <Dropdown
                    variant="filled"
                    filter
                    options={customerItems}
                    onChange={(e: DropdownChangeEvent) =>setcustomerSelect(e.value) }
                    style={{width:"100%", height: "40px", marginTop: "5px"}}
                    value={customerSelect} 
                    placeholder='Seleccionar'
                    className="w-full md:w-14rem"
                    invalid={customerEmpty}
                />
                {customerEmpty &&  <small id="username-help" className='empt-ymsg'> El proveedor es requerido</small>}
            </div>

             {/* technical */}
            <div style={{ width: "100%", marginTop: "10px"}}>
                <label htmlFor="username" style={{  }}>Tecnico Encargado</label>
                <Dropdown
                    variant="filled"
                    filter
                    options={technicalItems}
                    onChange={(e: DropdownChangeEvent) =>setTechnicalSelect(e.value) }
                    style={{width:"100%", height: "40px", marginTop: "5px"}}
                    value={technicalSelect} 
                    placeholder='Seleccionar'
                    className="w-full md:w-14rem"
                    invalid={customerEmpty}
                />
                {technicalEmpty &&  <small id="username-help" className='empt-ymsg'> El tecnico es requerido</small>}
            </div>

            <h4 style={{marginTop:"20px"}}>Datos del Dispositivo</h4>
            {/* categoria */}
            <div style={{ width: "100%" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Cateogría</label>
                <Dropdown
                    variant="filled"
                    filter
                    options={categoryItems}
                    onChange={(e: DropdownChangeEvent) =>setcategorySelect(e.value) }
                    style={{width:"100%", height: "40px", marginTop: "5px"}}
                    value={categorySelect} 
                    placeholder='Seleccionar'
                    className="w-full md:w-14rem"
                    invalid={categoryEmpty}
                />
                {categoryEmpty &&  <small id="username-help" className='empt-ymsg'> La categoria es requerido</small>}
            </div>
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
            {/* observation */}
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Observacion</label>
                <InputTextarea
                    value={observation} 
                    variant="filled"
                    onChange={(e) => setObservation(e.target.value)}
                    style={{ marginTop: "5px", width: "100%", height: "100px" }}    
                    invalid={observationEmpty} 
                />
                    {observationEmpty &&  <small id="username-help" className='empt-ymsg'>La description es requerida</small>}
            </div>
        </div>
            <Button
                onClick={validateInputs}
                label="Procesar" 
                style={{width:"100%", marginTop:"20px"}}
                size="small"
                // disabled={context.saleButtonDisable}
            />
    </>
  )
}

export default SupportForm