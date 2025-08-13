import { useEffect, useState } from "react";
import type { AppContextIn, DropdownItem } from "../../Interface/InApp";
import { customerListRequest } from "../../services/Customer.service";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { getCategoryDevRequest } from "../../services/category.service";
import { usersListRequest } from "../../services/Auth.service";
import type { User } from "../../Interface/InAuth";
import type { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import type { SupportGet, SupportPost } from "../../Interface/SupportIn";
import { postSupportRequest, updateSupportRequest } from "../../services/Support.Service";
import { useAppContext } from "../../context/AppContext";
import { postDeviceRequest, updateDeviceRequest } from "../../services/Device.service";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { RadioButton, type RadioButtonChangeEvent } from "primereact/radiobutton";

function SupportForm() {

    const context = useAppContext() as AppContextIn

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

    const [status, setStatus] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>()



    function cleanInputs(){
        setDescription("")
        setObservation("")
        setcustomerSelect(null)
        setcategorySelect(null)
        setTechnicalSelect(null)
    }
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
        let invalid: boolean = false

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
        return invalid
    }

    async function registerSupport(){
        const supportToSend: SupportPost={
            startDate: startDate? startDate as Date : new Date,
            total: 0,
            status: "ACTIVO",
            userId: Number(technicalSelect?.code),
            customerId: Number(customerSelect?.code)
            
        }
        console.log(supportToSend)
        try {
            const res: AxiosResponse<SupportGet> = await postSupportRequest(supportToSend)

            const suppId = res.data.id
            await postDeviceRequest({
                description: description,
                observation: observation,
                categoryId: Number(categorySelect?.code),
                supportId: suppId as number
            })
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async function updateSupport(){
        const suppSend = context.supportModify

        try {
            await updateSupportRequest( suppSend.id as number, {
                customerId: suppSend.customerId,
                startDate: suppSend.endDate as Date,
                status: status,
                total: suppSend.total,
                userId: suppSend.userId
            })
            
            await updateDeviceRequest(suppSend.devId, {
                description: description,
                observation: observation,
                categoryId: suppSend.categoryDevId,
                supportId: suppSend.id as number
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function handleSubmit(){
        if(validateInputs()) return
        
        if(context.supportUpdMode){
            await updateSupport()
        }else{
            await registerSupport();
        }

        cleanInputs()
        context.listSupport()
        context.setShowRSidebar(false)
        context.setSupportsUpdMode(false)
    }

    function isFormToUpdate(){
        cleanInputs()
        if(!context.supportUpdMode) return 

        if(context.supportModify != null){
            const supportCurrent = context.supportModify
            console.log(supportCurrent)
            setDescription(supportCurrent.description)
            setObservation(supportCurrent.observation)
            setStartDate(supportCurrent.startDate)
            setcategorySelect({
                label: supportCurrent.categoryDev, 
                code: (supportCurrent.categoryDevId+"")
            })
            setcustomerSelect({
                label: supportCurrent.customer,
                code: (supportCurrent.categoryDevId+"")
            })
            setTechnicalSelect({
                label: supportCurrent.user,
                code: (supportCurrent.userId+"")
            })
        }
    }


    useEffect(() => {
        cleanInputs()
        getItems()
        isFormToUpdate()
    }, [])


  return (
    <>
        <h3 style={{position: "absolute", top:"25px", zIndex:"2"}}>Datos del Soporte</h3>
            <div className="support-form-inputs">
            {/* customer */}
            <div style={{ width: "100%" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Cliente</label>
                {
                    !context.supportUpdMode? (
                        <Dropdown
                            variant="filled"
                            filter
                            options={customerItems}
                            onChange={(e: DropdownChangeEvent) =>setcustomerSelect(e.value) }
                            style={{width:"100%", height: "40px", marginTop: "5px"}}
                            value={customerSelect} 
                            key={`customer-${customerSelect?.code || 'empty'}`}
                            placeholder='Seleccionar'
                            className="w-full md:w-14rem"
                            invalid={customerEmpty}
                        />
                    ): (
                        <InputText
                            value={context.supportModify.customer}
                            // onChange={(e) => setName(e.target.value)}
                            variant="filled"
                            style={{ marginTop: "5px", width: "100%", height: "40px" }}
                            type="text"
                            disabled
                            />
                    )
                }
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
                
                {
                    !context.supportUpdMode? (
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
                    ):(
                        <InputText
                            value={context.supportModify.categoryDev}
                            // onChange={(e) => setName(e.target.value)}
                            variant="filled"
                            style={{ marginTop: "5px", width: "100%", height: "40px" }}
                            type="text"
                            disabled
                        />
                    )
                }
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
            {/* Date */}
            <div style={{marginTop: "10px"}}>
                <label htmlFor="buttondisplay" className="font-bold block mb-2">Fecha Inicio</label>
                    <Calendar 
                        id="buttondisplay" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value )}
                        showIcon 
                        variant="filled"
                        style={{ height: "40px", width:"100%", marginTop: "5px"}} 
                    />
            </div>
            {/* status */}
            <div style={{marginTop: "10px"}}>
                 <h4 >Estado del soporte</h4>
                <div style={{display:"flex", width:"100%", justifyContent:"space-between", marginTop:"10px"}}>
                    <div className="flex align-items-center">
                    <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e: RadioButtonChangeEvent) => setStatus(e.value)} checked={status === 'Cheese'} />
                    <label htmlFor="ingredient1" className="ml-2">Activo</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e: RadioButtonChangeEvent) => setStatus(e.value)} checked={status === 'Mushroom'} />
                    <label htmlFor="ingredient2" className="ml-2">Cancelado</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="ingredient3" name="pizza" value="Pepper" onChange={(e: RadioButtonChangeEvent) => setStatus(e.value)} checked={status === 'Pepper'} />
                    <label htmlFor="ingredient3" className="ml-2">Finalizado</label>
                </div>
                </div>
            </div>
            <div style={{height: "20px"}}></div>
        </div >
            <Button
                onClick={handleSubmit}
                label="Procesar" 
                style={{width:"100%", marginTop:"10px"}}
                size="small"
            />
    </>
  )
}

export default SupportForm