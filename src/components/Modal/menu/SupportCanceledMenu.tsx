import { MdDeleteOutline } from 'react-icons/md';
import { Dialog } from 'primereact/dialog';
import { TbListDetails } from "react-icons/tb";
import { GrConfigure } from 'react-icons/gr';
import { updateSupportStatusRequest } from '../../../services/Support.Service';
import { useAppContext } from '../../../context/AppContext';
import type { AppContextIn } from '../../../Interface/InApp';

interface Prop {
  suppId: number
  showthisModal: boolean
  setThisModal: (val: boolean) => void
}

function SupportCanceledMenu(prop: Prop) {

  const context = useAppContext() as AppContextIn

  

    
  async function setSupportToActive(){
    try {
      await updateSupportStatusRequest(prop.suppId, "ACTIVO")
      prop.setThisModal(false)
      context.listSupport()
    } catch (error) {
      console.log(error)
      alert("surgio un error al habilitar")
    }
  }
  
  function deleteSelected(){
    prop.setThisModal(false)
    context.showConfirmModal(true)
  }

  function openDetialsModal(){
    prop.setThisModal(false)
    context.showDetailModal(true)
  }

 



  return (
    <Dialog header="Opciones" visible={prop.showthisModal}  onHide={() => {prop.setThisModal(false) }}>
        <div className="menu-option">
            <div className='menu-option-item' onClick={() => openDetialsModal()}>
              <TbListDetails/>
              <p style={{marginLeft:"5px"}}>Detalles</p>
            </div>

            <div 
              onClick={() => deleteSelected()}
              className='menu-option-item'
            >
              <MdDeleteOutline/>
              <p style={{marginLeft:"5px"}}>Eliminar</p>
            </div>

            <div 
              onClick={() =>  setSupportToActive()}
              className='menu-option-item'
            >
              <GrConfigure/>
              <p style={{marginLeft:"5px"}}>Habilitar</p>
            </div>
        </div>
    </Dialog>
  )
}

export default SupportCanceledMenu