import { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import type { AuthContextIn, UserParams } from '../../../../Interface/InAuth'
import UserTable from '../../../../components/tables/register/UserTable'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../../context/AppContext'
import type { AppContextIn } from '../../../../Interface/InApp'
import FormModal from '../../../../components/Modal/FormModal'
import UserForm from '../../../../components/form/UserForm'
import { FiFilter } from 'react-icons/fi'
import FilterSidebar from '../../../../components/RightSidebar/FilterSidebar'
import UserFilterForm from '../../../../components/filterForm/UserFilterForm'

function UsersPage() {

  const { getUserList } = useAuth() as AuthContextIn
  const context = useAppContext() as AppContextIn
  const authContext = useAuth() as AuthContextIn
  const [isFilterList, setFilterList] = useState(false)


  async function submitParam(user: UserParams){
    try {
            await authContext.getUserListByParams(user)
            context.setFilterSidebar(false)   
            setFilterList(true)
        } catch (error) {
            console.log(error)
        }
  }


  useEffect(() => {
    getUserList()
    context.setGlobalTitleFn('Usuarios');
  }, [])



  return (
    <div className='main-con'>
      <div className='register-con'>
        <div className='register-head'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <InputText
                variant="filled" 
                type="text"
                placeholder="Buscar Usuario"
                style={{ height: "40px", width:"200px"}}
                onChange={(e) => authContext.listUserByFilter(e.target.value)}
              /> 
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                className={`filter-con ${isFilterList ? "filter-active" : ""}`}
                onClick={() => {
                  if (isFilterList) { //si el listado por filtro esta activo 
                    setFilterList(false)
                    authContext.getUserList()
                    return
                  }
                  context.setFilterSidebar(true)
                }}>
                  <FiFilter />
                  <p>Filtro</p>
              </div>
          </div>
          <div>
            
          </div>
          <div>
            <Button label="Nuevo Usuario" icon="pi pi-check" onClick={() => context.showFormModal(true)} size='small' />
          </div>
        </div>
        <UserTable />
      </div>
      <FormModal>
        <UserForm />
      </FormModal>

      <FilterSidebar>
        <UserFilterForm submitParam={submitParam}/>
      </FilterSidebar>
    </div>
  )
}

export default UsersPage