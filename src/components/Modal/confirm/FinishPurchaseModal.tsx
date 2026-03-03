import { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import { ConfirmDialog } from 'primereact/confirmdialog'

interface ModalProp {
    finishThisPurchase: () => void
}

function FinishPurchaseModal(prop: ModalProp) {

    const context = useAppContext() as AppContextIn

    return (
        <ConfirmDialog
            visible={context.isShowConfirmModal}
            accept={() => prop.finishThisPurchase()}
            onHide={() => { context.showConfirmModal(false) }}
            message={"Una ves finalizado, ya no se podra modificar? "}
            header="Desea finalizar?" icon="pi pi-exclamation-triangle"
            acceptLabel='Si'
        />
    )
}

export default FinishPurchaseModal