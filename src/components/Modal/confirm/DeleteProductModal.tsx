import type { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp {
    id: number 
}

function DeleteProductModal(prop: ModalProp) {
    const context = useAppContext() as AppContextIn

  return (
     <ConfirmDialog
        group="declarative"
        visible={context.isShowConfirmModal}
        accept={() => context.deleteProduct(prop.id)}
        onHide={() => {context.showConfirmModal(false)}} 
        message="Desea eliminar el proveedor seleccionado?" 
        header="Eliminar" icon="pi pi-exclamation-triangle" 
    />
  )
}

export default DeleteProductModal