import React, { useEffect } from 'react'
import type { AppContextIn } from '../../../../Interface/InApp'
import { useAppContext } from '../../../../context/AppContext'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import FormModal from '../../../../components/Modal/FormModal'
import ProductTable from '../../../../components/tables/register/ProductTable'
import ProductForm from '../../../../components/form/ProductForm'

function ProductPage() {

      const context = useAppContext() as AppContextIn
    
      useEffect(() => {
        context.productList()
      },[])

  return (
    <div className="main-con">
        <div className="register-con">
          <div className='register-head'>
                <InputText
                  onChange={(e) => {
                    context.productListByFilter(e.target.value)
                  }}
                  variant="filled"
                  type="text" 
                  placeholder="Buscar Producto" 
                  style={{height:"40px"}}
                />
                <div>
                    <Button 
                      label="Nuevo Cliente" 
                      icon="pi pi-check" 
                      size='small'
                      onClick={() => context.showFormModal(true)}
                    />
                </div>
            </div>
            <ProductTable/>
        </div>

        <FormModal>
          <ProductForm/>
        </FormModal>
    </div>
  )
}

export default ProductPage