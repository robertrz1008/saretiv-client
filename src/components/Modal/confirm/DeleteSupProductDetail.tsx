import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp {
    id: number
}


function DeleteSupProductDetail(prop: ModalProp) {

    const context = useAppContext() as AppContextIn

    return (
        <ConfirmDialog
            group="declarative"
            visible={context.isShowConfirmModal}
            accept={() => context.resetSuppProductFromDB(prop.id)}
            onHide={() => { context.showConfirmModal(false) }}
            message="Desea quitar el producto registrado?"
            header="Eliminar" icon="pi pi-exclamation-triangle"
        />
    )
}

export default DeleteSupProductDetail