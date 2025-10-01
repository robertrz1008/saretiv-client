import { useEffect } from 'react'
import "../../../styles/Sales.css"
import ProductsSelTable from '../../../../components/tables/Sales/ProductsSelTable'
import ProductDetailTable from '../../../../components/tables/Sales/ProductDetailTable'
import type { AppContextIn } from '../../../../Interface/InApp'
import { useAppContext } from '../../../../context/AppContext'

function SalePage() {

  const context = useAppContext() as AppContextIn

  useEffect(() => {
    context.setGlobalTitleFn('Ventas');
    context.productList()
  },[])
  useEffect(() => {
    context.sumTotal()
  },[context.productDetails])

  return (
    <div className='main-con'>
      <div className='sale-con'>
        <ProductsSelTable />
        <ProductDetailTable />
      </div>
    </div>
  )
}

export default SalePage