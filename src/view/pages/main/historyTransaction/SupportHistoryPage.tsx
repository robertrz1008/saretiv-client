import { Button } from "primereact/button"
import FilterSidebar from "../../../../components/RightSidebar/FilterSidebar"
import { FiFilter } from "react-icons/fi"
import { useState } from "react"
import SupportsTable from "../../../../components/tables/history/SupportsTable"
import SupportFilterForm from "../../../../components/filterForm/SupportFilterForm"
import { useAppContext } from "../../../../context/AppContext"
import type { AppContextIn } from "../../../../Interface/InApp"
import type { SupportParams } from "../../../../Interface/SupportIn"

function SupportHistoryPage() {

  const context = useAppContext() as AppContextIn
  const [isFilterList, setFilterList] = useState(false)



  async function submitParam(params: SupportParams) {
    try {
      await context.listSupportByParams(params)
      context.setFilterSidebar(false)
      setFilterList(true)
    } catch (error) {
      console.log(error)
    }
  }
  function filterHandle() {
    if (isFilterList) { //si el listado por filtro esta activo 
      setFilterList(false)
      context.listSupport()
      return
    }
    context.setFilterSidebar(true)
  }



return (
  <div className="main-con">
    <div className="register-con">
      <div className='register-head'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* <Dropdown
                  value={daysSelect}
                  variant="filled"
                  options={daysItems}
                  onChange={(e: DropdownChangeEvent) => setDaysSelect(e.value)}
                  style={{ width: "200px", height: "40px", marginTop: "5px" }}
                  // options={roles} 
                  placeholder='Seleccionar'
                  className="w-full md:w-14rem"
                /> */}

          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}
            onClick={() => filterHandle()}
            className={`filter-con ${isFilterList ? "filter-active" : ""}`}

          >
            <FiFilter />
            <p>Filtro</p>
          </div>
        </div>
        <div>
          <Button
            label="Generar PDF"
            icon="pi pi-check"
            severity="success"
            size='small'
            onClick={() => context.showFormModal(true)}
          />
        </div>
      </div>
      <SupportsTable />
    </div>

    <FilterSidebar>
      <SupportFilterForm submitParam={submitParam} />
    </FilterSidebar>
  </div>
)
}

export default SupportHistoryPage