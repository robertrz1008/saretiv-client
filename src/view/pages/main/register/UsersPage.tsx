import { useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import type { AuthContextIn } from '../../../../Interface/InAuth'
import UserTable from '../../../../components/tables/UserTable'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

function UsersPage() {

    const {getUserList, userList} = useAuth() as AuthContextIn

    useEffect(() => {
        getUserList()
    }, [])
    useEffect(() => {
        console.log(userList)
    }, [userList])

  return (
    <div className='main-con'>
          <div className='register-con'>
              <div className='register-head'>
                  <InputText 
                    variant="filled"
                    type="text" 
                    placeholder="Buscar Usuario" 
                    
                  />
                  <div>
                    <Button label="Nuevo Usuario" icon="pi pi-check"/>
                  </div>
              </div>
              <UserTable />
          </div>
         
    </div>
  )
}

export default UsersPage