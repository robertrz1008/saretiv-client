
import { Button } from 'primereact/button'
import SupportActivitiesTable from '../tables/supports/SupportActivitiesTable'
import SupportTypeSearch from '../Modal/search/SupportTypeSearch'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn } from '../../Interface/InApp'

function SupportActivities() {

  const context = useAppContext() as AppContextIn
  const [showthisModal, setShowThisModal] = useState(false)

  function setThisModal(val: boolean){
    setShowThisModal(val)
  }

  useEffect(() => {
    context.sumSupTotal()
  }, [context.activities])

  return (
    <div className='support-types-con'>
        <div className='flex f-jc-beetwen f-ai-center'>
            <h4 className='title'>Actividades</h4>
            <Button
              label="Agregar" 
              severity="success" rounded
              size='small'
            onClick={() => setThisModal(true)}
              style={{ marginRight: "10px", height:"35px"}}
            />
        </div>
        <SupportActivitiesTable />
        <SupportTypeSearch showthisModal={showthisModal} setThisModal={setThisModal}/>
    </div>
  )
}

export default SupportActivities