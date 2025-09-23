import { Dialog } from "primereact/dialog"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import { TbListDetails } from "react-icons/tb"
import { GrConfigure } from "react-icons/gr"
import { updateSupportStatusRequest } from "../../../services/Support.Service"
import { useEffect } from "react"

interface Prop {
  supId: number
  showthisModal: boolean
  setThisModal: (val: boolean) => void
}

function SupportFinishedMenu(prop: Prop) {

  const context = useAppContext() as AppContextIn




  async function setSupportToActive() {
    try {
      await updateSupportStatusRequest(prop.supId, "ACTIVO")
      prop.setThisModal(false)
      context.listSupport()
    } catch (error) {
      console.log(error)
      alert("surgio un error al habilitar")
    }
  }
  function openDetialsModal() {
    prop.setThisModal(false)
    context.showDetailModal(true)
  }





  return (
    <Dialog header="Opciones" visible={prop.showthisModal} onHide={() => { prop.setThisModal(false) }}>
      <div className="menu-option">
        <div className='menu-option-item' onClick={() => openDetialsModal()}>
          <TbListDetails />
          <p style={{ marginLeft: "5px" }}>Detalles</p>
        </div>
        <div className='menu-option-item' onClick={() => setSupportToActive()}>
          <GrConfigure />
          <p style={{ marginLeft: "5px" }}>Habilitar</p>
        </div>
      </div>
    </Dialog>
  )
}

export default SupportFinishedMenu