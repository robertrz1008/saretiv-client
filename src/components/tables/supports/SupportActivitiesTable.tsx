import { MdDeleteOutline } from "react-icons/md"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import type { ActivityGet } from "../../../Interface/Activities"
import { act, useState } from "react"
import DeleteActivityModal from "../../Modal/confirm/DeleteActivityModal"

function SupportActivitiesTable() {

    const context = useAppContext() as AppContextIn
    const [actId, setActId] = useState(0)
    const [modal, setModal] = useState(false)

    const handleModal = (val: boolean) => setModal(val)

   function handleDelete(act: ActivityGet){
    if(!act.isSaved){
        context.resetActivityFromCache(act.supportType.id as number)
        return
    }
    setModal(true)
    setActId(act.id as number)

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
                    <DeleteActivityModal 
                        handleModal={handleModal}
                        id={actId}
                        isModalOpen={modal}
                    />
                </tbody>
            </table>
        </div>

    )
}

export default SupportActivitiesTable