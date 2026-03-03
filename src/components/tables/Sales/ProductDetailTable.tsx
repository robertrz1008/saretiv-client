import { Button } from "primereact/button"
import { useAppContext } from "../../../context/AppContext"
import ProductDetailList from "./ProductDetailList"
import type { AppContextIn } from "../../../Interface/InApp"

function formatearConPuntos(numero: number): string {
  if (numero === null || numero === undefined) return "";

  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ProductDetailTable() {

    const context = useAppContext() as AppContextIn


    return(
        <div className="sale-form-con">
            <div className="total-con">
              <div className="total-con">
                {/* {
                  !context.total? (<h3 className='total-num'>{"TOTAL: 0"}</h3>) : (<h3 className='total-num'>{"TOTAL: "+context.total}</h3>)
                } */}
                  <h2>TOTAL: </h2><h2>{!context.total? "0" : formatearConPuntos(context.total)}</h2>
              </div>
             
            </div>
            <ProductDetailList/>
            {/* <div style={{overflowY: "auto", height: "90%"}}>

            </div> */}
            
                
            <Button 
              onClick={context.createSale}
              label="Procesar" 
              size="small"
              disabled={context.saleButtonDisable}
            />
        </div>
        
    )
}

export default ProductDetailTable