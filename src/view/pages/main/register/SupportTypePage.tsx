import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import SupportTypeTable from '../../../../components/tables/register/SupportTypeTable'
import FormModal from '../../../../components/Modal/FormModal'
import SupportTypeForm from '../../../../components/form/SupportTypeForm'
import { useAppContext } from '../../../../context/AppContext'
import type { AppContextIn } from '../../../../Interface/InApp'
import { useEffect } from 'react'

function SupportTypePage() {

  const context = useAppContext() as AppContextIn

  useEffect(() => {
    context.listSupportType()
  }, [])
  
  return (
     <div className="main-con">
        <div className="register-con">
          <div className='register-head'>
                <InputText
                  onChange={(e) => {
                    // context.productListByFilter(e.target.value)
                  }}
                  variant="filled"
                  type="text" 
                  placeholder="Buscar" 
                  style={{height:"40px"}}
                />
                <div>
                    <Button
                      label="Nuevo Tipo Soporte" 
                      icon="pi pi-check" 
                      size='small'
                      onClick={() => context.showFormModal(true)}
                    />
                </div>
            </div>
            <SupportTypeTable />
        </div>

        <FormModal>
          <SupportTypeForm/>
        </FormModal>
    </div>
  )
}

export default SupportTypePage