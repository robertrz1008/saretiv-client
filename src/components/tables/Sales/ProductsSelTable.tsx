import { InputText } from "primereact/inputtext"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"

function ProductsSelTable() {

    const context = useAppContext() as AppContextIn


  return (
    <div className="product-detail-con">
        <InputText
            onChange={(e) => {
                context.productListByFilter(e.target.value)
            }}
            variant="filled"
            type="text" 
            placeholder="Buscar Producto" 
            style={{height:"40px", width: "100%", marginBottom: "10px"}}
        />
        <div style={{width:"100%"}}><p>Productos en stock</p></div>
          <table>
                <thead className="register-thead">
                    <tr style={{height:"40px"}}>
                        <th>Desctipcion</th>
                        <th>Codigo</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                {
                    !context.products? (<h1>No hay cliente</h1>): (
                        <tbody>
                            {
                                context.products.map((data, id) => (
                                    <tr 
                                        style={{height:"40px"}}
                                        onClick={() => context.handleAddProduct({
                                            id: data.id as number,
                                            description: data.description,
                                            amount: 1,
                                            price: data.salePrice,
                                            subtotal: 0
                                        })}
                                    className='td-icon'
                                        key={id}>
                                        <td>{data.description }</td>
                                        <td>{data.barcode}</td>
                                        <td>{data.category.name}</td>
                                        <td>{data.stock}</td>
                                        <td>{data.salePrice}</td>
                                    </tr> 

                                ))
                            }
                        </tbody> 
                    )
                }
                
            </table>
    </div>
  )
}

export default ProductsSelTable