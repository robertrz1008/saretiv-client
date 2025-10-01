// import { ProductDetail } from "../../../Interface/AppIn"
import { MdDeleteOutline } from "react-icons/md";
import { useAppContext } from "../../../context/AppContext";
import type { AppContextIn } from "../../../Interface/InApp";
import ProductAmountTF from "../../reusable/ProductAmountTF";
import { useEffect } from "react";


export default function ProductDetailList() {

   const context = useAppContext() as AppContextIn

   useEffect(() => {
      console.log(context.productDetails)
   },[])

    if(context.productDetails.length == 0){
        return (
          <div className="sale-form-list-con list-void">
              <h4>Vacio</h4>
          </div>
        )
      }else{
    
          return (
            <div className="sale-form-list-con">
              <table className="sale-table-con">
                <thead>
                    <tr >
                      <th>Producto</th>
                      {/* <th className="td-price">Precio</th> */}
                      <th>Cantidad</th>
                      <th className="td-price">SubTotal</th>
                      <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    context.productDetails.map((pro, id) => (
                      <tr 
                        key={id} 
                        className="sale-table-tr"
                        style={{height:"40px"}}
                      >
                        <td>{pro.description}</td>
                        <ProductAmountTF
                            amountValue={pro.productAmount}
                            proId={pro.id as number}
                        />
                        <td className="td-price">{pro.subtotal}</td>
                        <td className="sale-icon-con">
                          <div 
                             onClick={() => context.deleteProductDetail(pro.id)}
                            className="icon-con"
                          >
                              <MdDeleteOutline/>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
    
      }
}
