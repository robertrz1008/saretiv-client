import React from 'react'
import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp{
    id: number
    deleteCategory: (id: number) => void
}

function DeleteCategoryProModal(prop: ModalProp) {
    const context = useAppContext() as AppContextIn


  return (
    <ConfirmDialog
              group="declarative"  
              visible={context.isShowConfirmModal} 
              accept={() => prop.deleteCategory(prop.id)}
              onHide={() => {context.showConfirmModal(false)}} 
              message={"Decea eliminar esta categoria? "} 
              header="Eliminar" icon="pi pi-exclamation-triangle"
        />  
  )
}

export default DeleteCategoryProModal