import { ConfirmDialog } from 'primereact/confirmdialog'
import { useAppContext } from '../../../context/AppContext'
import { AppContextIn } from '../../../Interface/InApp'

interface ModalProp {
    proId: number
}

function DeletePurchaseProductModal(prop: ModalProp) {

    const context = useAppContext() as AppContextIn

    return (
        <ConfirmDialog
            visible={context.deletePurProModal}
            accept={() => context.deletePurchaseProductfromDB(prop.proId)}
            onHide={() => { context.showDeletePurProModal(false) }}
            message="¿Desea quitar este producto?"
            header="Eliminar" icon="pi pi-exclamation-triangle"
            acceptLabel='Si'
        />
    )
}

export default DeletePurchaseProductModal