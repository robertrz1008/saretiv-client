import { Dialog } from 'primereact/dialog';
import  type { AppContextIn } from '../../Interface/InApp';
import {useAppContext } from '../../context/AppContext';
import type { ReactNode } from 'react';

interface ContexArg{
  children: ReactNode
}

function FormModal({children}: ContexArg) {

  const context = useAppContext() as AppContextIn

  return (
    <Dialog header={context.formTitle} position='top' visible={context.isFormModalOpen} style={{ marginTop:"50px"}} onHide={() => {context.showFormModal(false) }}>
          {children}
    </Dialog>
  )
}

export default FormModal