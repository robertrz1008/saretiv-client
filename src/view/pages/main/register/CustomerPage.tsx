import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import CustomerTable from "../../../../components/tables/register/CustomerTable"
import { useAppContext } from "../../../../context/AppContext"
import type { AppContextIn, CustomerParams } from "../../../../Interface/InApp"
import { useEffect, useState } from "react"
import FormModal from "../../../../components/Modal/FormModal"
import CustomerForm from "../../../../components/form/CustomerForm"
import { FiFilter } from "react-icons/fi"
import FilterSidebar from "../../../../components/RightSidebar/FilterSidebar"
import CustomerFilterForm from "../../../../components/filterForm/CustomerFilterForm"

function ClientPage() {

  const { customerList, showFormModal } = useAppContext() as AppContextIn
  const context = useAppContext() as AppContextIn

  const [isFilterList, setFilterList] = useState(false)




  async function submitParam(params: CustomerParams) {
    try {
      await context.getCustomerByParams(params)
      context.setFilterSidebar(false)
      setFilterList(true)
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    customerList()
    context.setGlobalTitleFn('Clientes');
  }, [])





  return (
    <div className="main-con">
      <div className="register-con">
        <div className='register-head'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <InputText
              onChange={(e) => context.customerListByFilter(e.target.value)}
              variant="filled"
              type="text"
              placeholder="Buscar Ciente"
              style={{ height: "40px" }}
            />
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              className={`filter-con ${isFilterList ? "filter-active" : ""}`}
              onClick={() => {
                if (isFilterList) { //si el listado por filtro esta activo 
                  setFilterList(false)
                  context.customerList()
                  return
                }
                context.setFilterSidebar(true)
              }}>
              <FiFilter />
              <p>Filtro</p>
            </div>

          </div>
          <div>
            <Button
              label="Nuevo Cliente"
              icon="pi pi-check"
              size='small'
              onClick={() => showFormModal(true)}
            />
          </div>
        </div>
        <CustomerTable />
      </div>

      <FormModal>
        <CustomerForm />
      </FormModal>
      <FilterSidebar>
        <CustomerFilterForm submitParam={submitParam} />
      </FilterSidebar>
    </div>
  )
}

export default ClientPage