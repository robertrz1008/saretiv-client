
import { Button } from 'primereact/button'
import SupportProductsTable from '../tables/supports/SupportProductsTable'
import { useState } from 'react'
import ProductSearch from '../Modal/search/ProductSearch'

function SupportProducts() {

  const [showthisModal, setShowThisModal] = useState(false)


  function setThisModal(val: boolean){
    setShowThisModal(val)
  }


  return (
    <div className='support-products-con'> 
          <div className='flex f-jc-beetwen f-ai-center'>
              <h4>Productos</h4>
              <div>
                <Button
                  label="Agregar"
                  severity="success" rounded
                  size='small'
                onClick={() => setThisModal(true)}
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