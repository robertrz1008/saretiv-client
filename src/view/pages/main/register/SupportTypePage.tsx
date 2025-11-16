import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import SupportTypeTable from '../../../../components/tables/register/SupportTypeTable'
import FormModal from '../../../../components/Modal/FormModal'
import SupportTypeForm from '../../../../components/form/SupportTypeForm'
import { useAppContext } from '../../../../context/AppContext'
import type { AppContextIn } from '../../../../Interface/InApp'
import { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import FilterSidebar from '../../../../components/RightSidebar/FilterSidebar'
import TypeSupportFilterForm from '../../../../components/filterForm/TypeSupportFilterForm'
import type { SupportTypeParams } from '../../../../Interface/SupportIn'
import { getSupportTypeReportRequest } from '../../../../services/SupportType.service'

function SupportTypePage() {

  const context = useAppContext() as AppContextIn
  const [isFilterList, setFilterList] = useState(false)
  const [isReportBtn, setReportBtn] = useState(false)





  async function submitParam(params: SupportTypeParams) {
        try {
          setReportBtn(true)
          await context.listSupportTypeByParams(params)

          setReportBtn(false)
          context.setFilterSidebar(false)
          setFilterList(true)
        } catch (error) {
          setReportBtn(true)
          console.log(error)
        }
      }

    async function generateReport(){
            try {
              const res = await getSupportTypeReportRequest(context.supportTypes)
        
              const filePDF = URL.createObjectURL(res.data)
              window.open(filePDF)
            } catch (error) {
              console.log(error)
            }
        }






  useEffect(() => {
    context.listSupportType()
    context.setGlobalTitleFn("Tipos de Soportes")
  }, [])








  return (
    <div className="main-con">
      <div className="register-con">
        <div className='register-head'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <InputText
              onChange={(e) => context.listSupportTypeByFilter(e.target.value)}
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
                  context.listSupportType()
                  return
                }
                context.setFilterSidebar(true)
              }}
            >
              <FiFilter />
              <p>Filtro</p>
            </div>

          </div>
          <div>
            <Button
              style={{marginRight:"10px"}}
              label="Reporte"
              severity="success"
              size='small'
              disabled={isReportBtn}
              onClick={generateReport}
            />
            <Button
              label="Nuevo Tipo Soporte"
              icon="pi pi-check"
              size='small'
              onClick={() => context.showFormModal(true)}
            />
          </div>
        </div>
        <SupportTypeTable />
      </div>

      <FormModal>
        <SupportTypeForm />
      </FormModal>
      <FilterSidebar>
        <TypeSupportFilterForm submitParam={submitParam}/>
      </FilterSidebar>
    </div>
  )
}

export default SupportTypePage