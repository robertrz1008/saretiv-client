import { Dialog } from 'primereact/dialog'
import { useState } from 'react'
import { Button } from 'primereact/button';
import { postCategoryProRequest } from '../../../services/category.service';
import { InputText } from 'primereact/inputtext';
import { useAppContext } from '../../../context/AppContext';
import { AppContextIn } from '../../../Interface/InApp';

interface ContexArg {
    showthisModal: boolean
    setThisModal: (val: boolean) => void
    getItems: () => void
}

function CategoryFormModal(prop: ContexArg) {

    const context = useAppContext() as AppContextIn
    const [description, setDescription] = useState("");
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    

    function validateInputs(): boolean {
        let invalid: boolean = false;

        if (description === "") {
            setDescriptionEmpty(true);
            invalid = true;
        } else {
            setDescriptionEmpty(false);
        }

        return invalid;
    }
    async function handleSubmit() {
        if (validateInputs()) {
            return;
        }
        try {
            await postCategoryProRequest({ name:description })
            prop.getItems()
            context.showToasSuccess("Categoría creada")
            cancel()
        } catch (error) {
            console.log(error)
        }
    }
    function cancel() {
        setDescription("")
        prop.setThisModal(false)
    }

  return (
    <Dialog header="Nueva Categoría" position='top' visible={prop.showthisModal} style={{ marginTop: "50px" }} onHide={() => { prop.setThisModal(false) }}>
                <form 
                    onSubmit={(e) =>{
                        e.preventDefault()
                        handleSubmit()
                    }}
                    className='register-form'
                >
                    <section className='person-section' style={{ width: "990px" }}>
                        {/* description */}
                        <div style={{ marginTop: "10px" }}>
                            <h4 style={{ marginTop: "10px" }}>Descripción</h4>
                            <InputText
                                value={description}
                                // variant="filled"
                                autoFocus
                                onChange={(e) => setDescription(e.target.value.toUpperCase())}
                                style={{ marginTop: "5px", width: "100%"}}
                                invalid={descriptionEmpty}
                            />
                            {descriptionEmpty && <small id="username-help" className='empt-ymsg'>La description es requerida</small>}
                        </div>
    
                    </section>
    
    
                    {/* buttons */}
                    <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            label="Cancelar" outlined
                            size='small'
                            type='reset'
                            onClick={() => cancel()}
                            style={{ marginRight: "10px", width: "200px" }} />
                        <Button
                            type='submit'
                            label="Guardar"
                            raised
                            size='small'
                            style={{ width: "200px" }}
                        />
                    </div>
                </form>
    
            </Dialog>
  )
}

export default CategoryFormModal