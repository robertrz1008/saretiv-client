import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp{
    id: number
}

function DeleteCostomerModal(prop:ModalProp) {

    const context = useAppContext() as AppContextIn

  return (
    <ConfirmDialog
              group="declarative"  
              visible={context.isShowConfirmModal} 
              accept={() => context.deleteCustomer(prop.id)}
              onHide={() => {context.showConfirmModal(false)}} 
              message={"Do you wish to delete this customer? "+prop.id} 
              header="Eliminar" icon="pi pi-exclamation-triangle" 
        />
  )
}

export default DeleteCostomerModal