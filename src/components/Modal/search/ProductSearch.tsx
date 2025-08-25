import { useEffect } from 'react'
import type { AppContextIn, ProductGet } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

interface Prop {
  showthisModal: boolean
  setThisModal: (val: boolean) => void
}

function ProductSearch(prop: Prop) {
  const context = useAppContext() as AppContextIn


  function addProductDetial(pro: ProductGet){
    context.handleAddSuppProduct({
      id: pro.id as number,
      description: pro.description,
      productAmount: 1,
      price: pro.salePrice,
      subtotal: 0
    })
    prop.setThisModal(false)
  }



  useEffect(() => {
    context.productList()
  }, [])

  return (
    <Dialog header={"Seleccionar Producto"} visible={prop.showthisModal} style={{ marginTop: "50px" }} onHide={() => { prop.setThisModal(false) }}>
      <div className='search-con'>
        <InputText
          // value={description}
          variant="filled"
          onChange={(e) => context.productListByFilter(e.target.value)}
          placeholder="Buscar"
          style={{ width: "100%" }}
        />

        <div className="sale-form-list-con">
          <table className="sale-table-con">
            <thead>
              <tr >
                <th>Descripción</th>
                {/* <th className="td-price">Precio</th> */}
                <th>Categoria</th>
                <th className='td-number'>Stock</th>
                <th className="td-number">Precio</th>
              </tr>
            </thead>
            <tbody>
              {
                !context.products? 
                        ( <tr></tr> ) : 
                        context.products.map((pro, id) => (
                          <tr
                            key={id}
                            className="sale-table-tr"
                            style={{ height: "40px" }}
                            onClick={() => addProductDetial(pro)}
                          >
                            <td>{pro.description}</td>
                            <td className="td-price">{pro.category.name}</td>
                            <td className='td-number'>{pro.stock}</td>
                            <td className="td-number">{pro.entryPrice}</td>
                          </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>

  )
}

export default ProductSearch