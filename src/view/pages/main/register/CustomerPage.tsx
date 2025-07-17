import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import CustomerTable from "../../../../components/tables/CustomerTable"
import { useAppContext } from "../../../../context/AppContext"
import type { AppContextIn } from "../../../../Interface/InApp"
import { useContext, useEffect } from "react"
import FormModal from "../../../../components/Modal/FormModal"
import CustomerForm from "../../../../components/form/CustomerForm"

function ClientPage() {

  const {customerList, showFormModal} = useAppContext() as AppContextIn
  const context = useAppContext() as AppContextIn

  useEffect(() => {
    customerList()
  },[])

  return (
    <div className="main-con">
        <div className="register-con">
          <div className='register-head'>
                <InputText
                  onChange={(e) => context.customerListByFilter(e.target.value)}
                  variant="filled"
                  type="text"  
                  placeholder="Buscar Ciente" 
                  style={{height:"40px"}}
                />
                <div>
                    <Button 
                      label="Nuevo Cliente" 
                      icon="pi pi-check" 
                      size='small'
                      onClick={() => showFormModal(true)}
                    />
                </div>
            </div>
            <CustomerTable/>
        </div>

        <FormModal>
          <CustomerForm/>
        </FormModal>
    </div>
  )
}

export default ClientPage