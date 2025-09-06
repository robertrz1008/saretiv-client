import { ConfirmDialog } from "primereact/confirmdialog"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"

interface ModalProp{
    id: number
    isModalOpen: boolean
    handleModal: (val: boolean) => void
}

function DeleteActivityModal(prop: ModalProp) {

    const context = useAppContext() as AppContextIn

  return (
    <ConfirmDialog
        group="declarative"  
        visible={prop.isModalOpen} 
        accept={() =>{context.resetActivityFromDB(prop.id)}}
        onHide={() => {prop.handleModal(false)}} 
        message={"¿Deceas quitar esta actividad registrada? "} 
        header="Eliminar" icon="pi pi-exclamation-triangle"
        acceptLabel='Si'
    />
  )
}

export default DeleteActivityModal