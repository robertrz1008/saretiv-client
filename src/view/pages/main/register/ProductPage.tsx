import { useEffect, useState } from 'react'
import type { AppContextIn, ProductParams } from '../../../../Interface/InApp'
import { useAppContext } from '../../../../context/AppContext'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import FormModal from '../../../../components/Modal/FormModal'
import ProductTable from '../../../../components/tables/register/ProductTable'
import ProductForm from '../../../../components/form/ProductForm'
import { FiFilter } from 'react-icons/fi'
import FilterSidebar from '../../../../components/RightSidebar/FilterSidebar'
import ProductFilterForm from '../../../../components/filterForm/ProductFilterForm'

function ProductPage() {

  const context = useAppContext() as AppContextIn
  const [isFilterList, setFilterList] = useState(false)



   async function submitParam(params: ProductParams) {
      try {
        await context.getProductsByParams(params)
        context.setFilterSidebar(false)
        setFilterList(true)
      } catch (error) {
        console.log(error)
      }
    }




  useEffect(() => {
    context.productList()
    context.setGlobalTitleFn('Productos');
  }, [])


  return (
    <div className="main-con">
      <div className="register-con">
        <div className='register-head'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <InputText
              onChange={(e) => {
                context.productListByFilter(e.target.value)
              }}
              variant="filled"
              type="text"
              placeholder="Buscar Producto"
              style={{ height: "40px" }}
            />
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              className={`filter-con ${isFilterList ? "filter-active" : ""}`}
              onClick={() => {
                if (isFilterList) { //si el listado por filtro esta activo 
                  setFilterList(false)
                  context.productList()
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
              onClick={() => context.showFormModal(true)}
            />
          </div>
        </div>
        <ProductTable />
      </div>

      <FormModal>
        <ProductForm />
      </FormModal>
      <FilterSidebar>
        <ProductFilterForm submitParam={submitParam}/>
      </FilterSidebar>
    </div>
  )
}

export default ProductPage