import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import type { AppContextIn, DropdownItem } from '../../Interface/InApp';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { getCategoryDevRequest } from '../../services/category.service';
import type { SupportTypeDTO } from '../../Interface/SupportIn';
import { postSupportTypeRequest, updateSupportTypeRequest } from '../../services/SupportType.service';

function SupportTypeForm() {

    const context = useAppContext() as AppContextIn

    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [amount, setAmount] = useState(0);
    const [amountEmpty, setAmountEmpty] = useState(false);

    const [supportTypeItems, setupportTypeItems] = useState<DropdownItem[]>([]);
    const [supportTypeSelect, setupportTypeSelect] = useState<DropdownItem | null>(null)
    const [supportTypeEmpty, setupportTypeEmpty] = useState(false);






    async function getItems() {
            const categories = await getCategoryDevRequest()
            setupportTypeItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.id.toString() }))); 
            
    }
    function validateInputs(){

        let invalid: boolean = false;

        if (description === "") {
        setDescriptionEmpty(true);
        invalid = true;
        } else {
        setDescriptionEmpty(false);
        }

        if(amount == 0){
            setAmountEmpty(true)
            invalid= true
        }else{
            setAmountEmpty(false)
        }

        if (supportTypeSelect == null) {
            setupportTypeEmpty(true);
            invalid = true;
        } else {
            setupportTypeEmpty(false);
        }

        return invalid;
    }
    function cleanInput(){
        setDescription("")
        setAmount(0)
        setupportTypeSelect(null)
    }
    function cancel(){
        cleanInput()
        context.showFormModal(false)
        context.setSupportTypeUpdateMode(false)
    }
    async function handleSubmit(){
        if(validateInputs()) return;

        const supportTypeSubmit: SupportTypeDTO = {
            description: description,
            amount: amount,
            category:{
                id: Number(supportTypeSelect?.code)
            }
        }
        try {
            if(context.supportTypeUpdMode){
                await updateSupportTypeRequest(
                    context.supportTypeModify.id as number,
                    supportTypeSubmit
                )
            }else{
                await postSupportTypeRequest(supportTypeSubmit)
            }
            
            context.listSupportType()
            cancel()
        } catch (error) {
            console.log(error)
        }
    }
      function setFormForUpdate(){
        if(context.supportTypeUpdMode){
            const supportType = context.supportTypeModify
            setDescription(supportType.description)
            setAmount(supportType.amount)
            setupportTypeSelect(
                {label: supportType.category.name, 
                code: (supportType.category.id as number)+"" }
            )
        }
    }



    useEffect(() => {

        context.setModalFormTitle("Datos del Tipo de Soporte")
        getItems()
        setFormForUpdate()
    }, [])







  return (
    <div className='register-form' style={{ width: "430px" }}>
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
        {/* Category */}
        <div style={{marginTop: "10px" }}>
            <label htmlFor="username" >Categoria de dispositivo</label>
            <Dropdown 
                value={supportTypeSelect}
                filter
                variant="filled"
                options={supportTypeItems}
                onChange={(e: DropdownChangeEvent) =>setupportTypeSelect(e.value) }
                style={{width:"100%", height: "40px", marginTop: "5px"}}
                // options={roles} 
                placeholder='Seleccionar'
                className="w-full md:w-14rem" 
                invalid={supportTypeEmpty}
                />
                {supportTypeEmpty &&  <small id="username-help" className='empt-ymsg'> La categoria es requerida</small>}
        </div>
        {/* stock */}
        <div style={{ marginTop: "10px" }}>
            <label htmlFor="username" style={{ marginTop: "10px" }}>Monto</label>
            <InputNumber
                inputId="integeronly" 
                variant="filled"
                value={amount} 
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                onValueChange={(e) => setAmount(e.value as number)}
            />
            {amountEmpty &&  <small id="username-help" className='empt-ymsg'> El monto es requerida</small>}
        </div>
        

        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button
                label="Cancelar" outlined 
                size='small' 
                onClick={cancel}
                style={{ marginRight: "10px" }} 
            />
            <Button 
                type='submit'
                label="Guardar" 
                raised 
                onClick={handleSubmit}
                size='small'
            />
        </div>
    </div>
  )
}

export default SupportTypeForm