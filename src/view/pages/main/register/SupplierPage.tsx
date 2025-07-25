import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import SupplierTable from '../../../../components/tables/register/SupplierTable'
import { useEffect } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import type { AppContextIn } from '../../../../Interface/InApp'
import FormModal from '../../../../components/Modal/FormModal'
import SupplierForm from '../../../../components/form/SupplierForm'

function SupplierPage() {

    const context = useAppContext() as AppContextIn

    useEffect(() =>{
        context.supplierList()
    }, [])

  return (
    <div className='main-con'>
        <div className='register-con'>
            <div className='register-head'>
                <InputText
                    onChange={(e) => context.supplierListByFilter(e.target.value)}
                    variant="filled"
                    type="text"  
                    placeholder="Buscar Proveedor" 
                    style={{height:"40px"}}
                />
                <div>
                    <Button
                      label="Nuevo Proveedor" 
                      icon="pi pi-check" 
                      size='small'
                      onClick={() =>{context.showFormModal(true)}}
                    />
                </div>
            </div>
            <SupplierTable/>
        </div>
        <FormModal>
            <SupplierForm/>
        </FormModal>
    </div>
  )
}

export default SupplierPage