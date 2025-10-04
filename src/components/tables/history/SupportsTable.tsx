import { useEffect, useState } from 'react'
import type { AppContextIn } from '../../../Interface/InApp'
import { useAppContext } from '../../../context/AppContext'
import type { SupportCustomGet } from '../../../Interface/SupportIn'
import { TbListDetails } from 'react-icons/tb'
import SupportDetailsModal from '../../Modal/details/SupportDetailsModal'

function SupportsTable() {

  const context = useAppContext() as AppContextIn
  const [supportFinalized, setSupportFinalized] = useState<SupportCustomGet[]>([])
  const [supId, setSupId] = useState(0)

  function getSupportFinalized(){
    const supports = context.supports.filter(sup => sup.status == "FINALIZADO")
    setSupportFinalized(supports)
  }

  useEffect(() => {
    context.listSupport()
  }, [])

  useEffect(() => {
    getSupportFinalized()
  }, [context.supports])

  return (
            <table>
                <thead className="register-thead">
                    <tr>
                        <th>Cliente</th>
                        <th>Dispositivo</th>
                        <th>Categoria</th>
                        <th>Tecnico</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th className='td-number'>Total</th>
                        <th style={{width:"40px"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !supportFinalized ?
                            (<tr></tr>) :
                            supportFinalized.map((pro, id) => (
                                <tr
                                    key={id}
                                    style={{cursor:"default"}}
                                >
                                    <td>{pro.customer}</td>
                                    <td>{pro.description}</td>
                                    <td>{pro.categoryDev}</td>
                                    <td>{pro.user}</td>
                                    <td>{new Date(pro.startDate).toISOString().slice(0,10)}</td>
                                    <td>{new Date(pro.endDate as Date).toISOString().slice(0,10)}</td>
                                    <td className="td-number">{pro.total}</td>
                                    <td style={{width:"40px"}}>
                                        <TbListDetails onClick={() => {
                                            setSupId(pro.id as number)
                                            context.showDetailModal(true)
                                        }}/>
                                    </td>
                                    
                                </tr>
                            ))
                    }
                </tbody>
                <SupportDetailsModal suppId={supId}/>
            </table>
    )
}

export default SupportsTable