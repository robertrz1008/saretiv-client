import { MdDeleteOutline } from "react-icons/md"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import { useEffect, useState } from "react"
import type { SuppProductDetail } from "../../../Interface/SupportIn"
import DeleteSupProductDetail from "../../Modal/confirm/DeleteSupProductDetail"

function SupportProductsTable() {
    const context = useAppContext() as AppContextIn
    const productDetail = context.supProDetail
    const [proId, setProId] = useState(0)



    async function isDelete(supPro: SuppProductDetail){
        if(!supPro.isSaved){
            context.resetSuppProduct(supPro.id)
            return
        }
        context.showConfirmModal(true)
        setProId(supPro.id)
    }


    useEffect(() => {
        context.sumSupTotal()
    }, [context.supProDetail])
    
  return (
    <div className="sale-form-list-con">
            <table className="sale-table-con">
                <thead className="register-thead">
                    <tr>
                        <th>Descripción</th>
                        <th className="td-number">Cantidad</th>
                        <th className="td-number">Monto</th>
                        <th className="td-number">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !productDetail ?
                            (<tr></tr>) :
                            productDetail.map((pro, id) => (
                                <tr
                                    key={id}
                                    className="sale-table-tr"
                                    style={{ height: "40px" }}
                                >
                                    <td>{pro.description}</td>
                                    <td className="td-number">{pro.productAmount}</td>
                                    <td className="td-number">{pro.price}</td>
                                    <td className="td-number">{pro.subtotal}</td>
                                    
                                    <td>
                                        <MdDeleteOutline
                                            onClick={() => isDelete(pro)}
                                        />
                                    </td>
                                </tr>
                            ))
                    }
                    <DeleteSupProductDetail id={proId}/>
                </tbody>
            </table>
        </div>
  )
}

export default SupportProductsTable