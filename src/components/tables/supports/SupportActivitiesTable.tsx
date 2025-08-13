import { useState } from "react"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import type { SupportTypeGet } from "../../../Interface/SupportIn"

function SupportActivitiesTable() {

    const context = useAppContext() as AppContextIn

    const [activities, setActivities] = useState<SupportTypeGet[]>([])
    return (
        <div className="sale-form-list-con">
            <table className="sale-table-con">
                <thead className="register-thead">
                    <tr>
                        <th className="td-id"></th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th className='td-icon'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !activities ?
                            (<tr></tr>) :
                            activities.map((pro, id) => (
                                <tr
                                    key={id}
                                    className="sale-table-tr"
                                    style={{ height: "40px" }}
                                >
                                    <td></td>
                                    <td>{pro.description}</td>
                                    <td className="td-number">{pro.amount}</td>
                                    <td></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default SupportActivitiesTable