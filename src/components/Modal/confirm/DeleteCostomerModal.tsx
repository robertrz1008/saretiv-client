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
              message={"¿Desea eliminar este cliente?"} 
              header="Eliminar" icon="pi pi-exclamation-triangle" 
              acceptLabel='Si'
        />
  )
}

export default DeleteCostomerModal