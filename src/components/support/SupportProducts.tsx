
import { Button } from 'primereact/button'
import SupportProductsTable from '../tables/supports/SupportProductsTable'
import { useState } from 'react'
import ProductSearch from '../Modal/search/ProductSearch'
import type { ProductDetail } from '../../Interface/SalesInterfaces'

function SupportProducts() {

  const [showthisModal, setShowThisModal] = useState(false)


  function setThisModal(val: boolean){
    setShowThisModal(val)
  }


  return (
    <div className='support-products-con'> 
          <div className='flex f-jc-beetwen f-ai-center'>
              <h4>Productos, Respuestos</h4>
              <div>
                <Button
                  label="Producto"
                  severity="secondary" rounded
                  size='small'
                onClick={() => setThisModal(true)}
                  style={{ marginRight: "10px", height:"35px"}}
              />
              <Button
                  label="Respuesto"
                  severity="success" rounded
                  size='small'
                // onClick={() => cancel()}
                  style={{ marginRight: "10px", height:"35px"}}
              />
              </div>
          </div>
          <SupportProductsTable/>
          <ProductSearch  showthisModal={showthisModal} setThisModal={setThisModal}/>
    </div>
  )
}

export default SupportProducts