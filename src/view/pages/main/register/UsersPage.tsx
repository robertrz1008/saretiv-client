import { useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import type { AuthContextIn } from '../../../../Interface/InAuth'
import UserTable from '../../../../components/tables/UserTable'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../../context/AppContext'
import type { AppContextIn } from '../../../../Interface/InApp'
import FormModal from '../../../../components/Modal/FormModal'
import UserForm from '../../../../components/form/UserForm'

function UsersPage() {

    const {getUserList} = useAuth() as AuthContextIn
    const context = useAppContext() as AppContextIn
    const authContext = useAuth() as AuthContextIn

    useEffect(() => {
        getUserList()
        context.setGlobalTitleFn('Usuarios');
    }, [])

  return (
    <div className='main-con'>
          <div className='register-con'>
              <div className='register-head'>
                  <InputText 
                    variant="filled"
                    type="text" 
                    placeholder="Buscar Usuario" 
                    style={{height:"40px"}}
                    onChange={(e) => authContext.listUserByFilter(e.target.value)}
                  />
                  <div>
                    <Button label="Nuevo Usuario" icon="pi pi-check" onClick={ () => context.showFormModal(true)} size='small'/>
                  </div>
              </div>
              <UserTable />
          </div>
          <FormModal>
              <UserForm />
          </FormModal>
         
    </div>
  )
}

export default UsersPage