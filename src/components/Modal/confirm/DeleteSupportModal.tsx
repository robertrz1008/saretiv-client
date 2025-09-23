import React from 'react'
import { useAppContext } from '../../../context/AppContext'
import type { AppContextIn } from '../../../Interface/InApp'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp {
    id: number
}

function DeleteSupportModal(prop: ModalProp) {

    const context = useAppContext() as AppContextIn

    return (
        <ConfirmDialog
            group="declarative"
            visible={context.isShowConfirmModal}
            accept={() => context.deleteSupport(prop.id)}
            onHide={() => { context.showConfirmModal(false) }}
            message={"¿Desea eliminar este soporte? "}
            header="Eliminar" icon="pi pi-exclamation-triangle"
        />)
}

export default DeleteSupportModal