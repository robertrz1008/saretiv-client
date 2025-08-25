import { MdDeleteOutline } from "react-icons/md"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import type { activityGet } from "../../../Interface/Activities"

function SupportActivitiesTable() {

    const context = useAppContext() as AppContextIn

   function handleDelete(act: activityGet){
    if(!act.isSaved){
        context.resetActivityFromCache(act.supportType.id as number)
        return
    }

   }

    return (
        <div className="sale-form-list-con">
            <table className="sale-table-con">
                <thead className="register-thead">
                    <tr>
                        <th>Descripción</th>
                        <th className="td-number">Monto</th>
                        <th className='td-icon'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !context.activities ?
                            (<tr></tr>) :
                            context.activities.map((pro, id) => (
                                <tr
                                    key={id}
                                    className="sale-table-tr"
                                    style={{ height: "40px", cursor:"auto" }}
                                >
                                    <td>{pro.supportType.description}</td>
                                    <td className="td-number">{pro.supportType.amount}</td>
                                    <td>
                                        <MdDeleteOutline
                                            style={{cursor:"pointer" }}
                                            onClick={() => handleDelete(pro)}
                                        />
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default SupportActivitiesTable