import { Button } from "primereact/button"
import type { AppContextIn, DropdownItem } from "../../../../Interface/InApp"
import { useAppContext } from "../../../../context/AppContext"
import { useEffect, useState } from "react"
import { getDateDaysAgo, toDay } from "../../../../utils/DateUtils"
import SalesTable from "../../../../components/tables/history/SalesTable"
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown"
import { FiFilter } from "react-icons/fi"
import FilterSidebar from "../../../../components/RightSidebar/FilterSidebar"
import SalesFilterForm from "../../../../components/filterForm/SalesFilterForm"
import type { SaleParams } from "../../../../Interface/SalesInterfaces"
import { getSaleReportRequest } from "../../../../services/Sale.service"

function SalesHistoryPage() {

  const context = useAppContext() as AppContextIn
  const [daysItems, _setDaysItems] = useState<DropdownItem[]>([
    { label: "Hoy", code: "1" },
    { label: "Ultimos 7 dias", code: "7" },
    { label: "Ultimos 30 dias", code: "30" }
  ]);
  const [daysSelect, setDaysSelect] = useState<DropdownItem | null>({ label: "Hoy", code: "1" })
  const [isFilterList, setFilterList] = useState(false)
  const [total, setTotal] = useState(0)




  function getDaysForList(days: string) {
    let n = 0;

    if (days == "1") {
      context.listSalesByDates(toDay().fechaA01, toDay().fechaActual)
      return
    }

    switch (days) {
      case "7":
        n = 7
        break;
      case "30":
        n = 30
        break;
    }

    const getDate = getDateDaysAgo(n);
    //  console.log(getDate)
    context.listSalesByDates(getDate.fechaPasada, getDate.fechaHoy)
  }



  function setUp() {
    context.setGlobalTitleFn("Ventas")
    setDaysSelect({ label: "Hoy", code: "1" })
  }

  async function submitParam(params: SaleParams) {
    try {
      await context.listSalesByParams(params)
      context.setFilterSidebar(false)
      setFilterList(true)
    } catch (error) {
      console.log(error)
    }
  }
  async function generateReport() {

    const list = context.salesList

    if(list.length == 0){
      alert("La lista está vacia")
      return
    }
    try {
      const res = await getSaleReportRequest(list)

      const filePDF = URL.createObjectURL(res.data)
      window.open(filePDF)
    } catch (error) {
      console.log(error)
    }
  }








  useEffect(() => {
    getDaysForList(daysSelect?.code as string)
  }, [daysSelect])

  useEffect(() => {
    const result = context.salesList.reduce((con, el) => con + el.subtotal, 0)
    setTotal(result)
  }, [context.salesList])

  useEffect(() => {
    setUp()
  }, [])







  return (
    <div className="main-con">
      <div className="register-con">
        <div className='register-head'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Dropdown
              value={daysSelect}
              variant="filled"
              options={daysItems}
              onChange={(e: DropdownChangeEvent) => setDaysSelect(e.value)}
              style={{ width: "200px", height: "40px", marginTop: "5px" }}
              // options={roles} 
              placeholder='Seleccionar'
              className="w-full md:w-14rem"
            />

            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}
              className={`filter-con ${isFilterList ? "filter-active" : ""}`}
              onClick={() => {
                if (isFilterList) { //si el listado por filtro esta activo 
                  setFilterList(false)
                  getDaysForList(daysSelect?.code as string)
                  return
                }
                context.setFilterSidebar(true)
              }}>
              <FiFilter />
              <p>Filtro</p>
            </div>
          </div>
          <div  style={{position:"relative", top:"10px"}}>
            <h3 style={{color:"green"}}>Total: {total}</h3>
          </div>
          <div>
            <Button
              label="Reporte"
              icon="pi pi-check"
              severity="success"
              size='small'
              onClick={generateReport}
            />
          </div>
        </div>
        <SalesTable />
      </div>

      <FilterSidebar>
        <SalesFilterForm submitParam={submitParam} />
      </FilterSidebar>
    </div>
  )
}

export default SalesHistoryPage