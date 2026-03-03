import { useState } from 'react'
import type { AppContextIn } from '../../../Interface/InApp';
import { useAppContext } from '../../../context/AppContext';
import { MdDeleteOutline } from 'react-icons/md';
import DeleteProductModal from '../../Modal/confirm/DeleteProductModal';

function ProductTable() {

    const context = useAppContext() as AppContextIn
    const [productID, setProductID] = useState(0);

  return (
    <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th style={{width:"200px"}}>Codigo</th>
                    <th>Descripción</th>
                    <th >Categoria</th>
                    <th className='td-number'>Stock</th>
                    <th className='td-number'>PrecioCompra</th>
                    <th className='td-number'>Precio</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !context.productList? (<h3 >No product</h3>): (
                     <tbody>
                        {
                            context.products.map((data, id) => (
                                <tr 
                                    onClick={() =>{    
                                        context.setProductUpdate(data)
                                        context.setProductUpdateMode(true)
                                        context.showFormModal(true)
                                    }}
                                className='td-icon' 
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td style={{width:"200px"}}>{data.barcode}</td>
                                    <td>{data.description}</td>
                                    <td>{data.category.name}</td>
                                    
                                    <td className='td-number'>{data.stock}</td>
                                    <td className='td-number'>{data.salePrice}</td>
                                    <td className='td-number'>{data.entryPriceMin}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <MdDeleteOutline
                                            onClick={() => {
                                                setProductID(data.id as number)
                                                context.showConfirmModal(true)
                                            }}
                                        />
                                        <DeleteProductModal id={productID}/>
                                    </td>
                                </tr> 

                            ))
                        }
                    </tbody> 
                )
            }
        </table>
  )
}

export default ProductTable
