import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp {
    deletePurchase: () => void
    showModal: boolean,
    setShowModal: (bal: boolean) => void
}

function DeletePurchateModal(prop: ModalProp) {

    return (
        <ConfirmDialog
            visible={prop.showModal}
            accept={() => prop.deletePurchase()}
            onHide={() => { prop.setShowModal(false) }}
            message="¿Desea eliminar esta compra?"
            header="Eliminar" icon="pi pi-exclamation-triangle"
            acceptLabel='Si'
        />
    )
}

export default DeletePurchateModal