import { ConfirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '../../../context/AppContext';
import type { AppContextIn } from '../../../Interface/InApp';
import { useAuth } from '../../../context/AuthContext';
import type { AuthContextIn } from '../../../Interface/InAuth';

 interface ModalProp{
    id: number
}

function DeleteUserModal(prop: ModalProp) {

  const {isShowConfirmModal, showConfirmModal} = useAppContext() as AppContextIn
  const authContext = useAuth() as AuthContextIn

  async function deleteU(){

    if(prop.id == authContext.user.id as number){
      alert("Error, estas logeado con este usuario")
      return
    }

    const val = await authContext.deleteUser(prop.id)
    if(val){
      showConfirmModal(false)
    }
  }

  
  return (
    <>
    <ConfirmDialog 
          group="declarative"
          visible={isShowConfirmModal}
          accept={() => deleteU()}
          onHide={() => {showConfirmModal(false)}} 
          message="Desea eliminar el producto seleccionado?" 
          header="Eliminar" icon="pi pi-exclamation-triangle" 
          acceptLabel='Si'
    />
</>
  )
}

export default DeleteUserModal