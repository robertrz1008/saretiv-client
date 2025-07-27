import { Button } from "primereact/button"
import { useAppContext } from "../../../context/AppContext"
import ProductDetailList from "./ProductDetailList"
import type { AppContextIn } from "../../../Interface/InApp"

function ProductDetailTable() {

    const context = useAppContext() as AppContextIn


    return(
        <div className="sale-form-con">
            {/* <div className='pd-title-con'>
                <h3>Detalle de productos</h3>
            </div> */}
  
            <ProductDetailList/>
            <div style={{overflowY: "auto", height: "90%"}}>

            </div>
            <div className="total-con">
            <div className="total-con">
              {
                !context.total? (<h3>{"TOTAL: 0"}</h3>) : (<h3>{"TOTAL: "+context.total}</h3>)
              }
            </div>
             
            </div>
                
            <Button 
              onClick={context.createSale}
              label="Procesar" 
              size="small"
            />
        </div>
        
    )
}

export default ProductDetailTable