import { Dialog } from 'primereact/dialog'
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn } from '../../Interface/InApp'
import EnterpiseUpdForm from '../form/EnterpiseUpdForm'
import type { AuthContextIn } from '../../Interface/InAuth'
import { useAuth } from '../../context/AuthContext'


function EnterpriseFormModal() {
    const context = useAppContext() as AppContextIn
    const {enterprise} = useAuth() as AuthContextIn

  return (
    <Dialog header={"Datos de la empresa"} position='top' visible={context.showEnterpriseModal} style={{ marginTop:"50px"}} onHide={() => {context.handleEnterpriseModal(false) }}>
              <EnterpiseUpdForm enterprise={enterprise}/>
        </Dialog>
  )
}

export default EnterpriseFormModal