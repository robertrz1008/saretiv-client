import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn } from '../../Interface/InApp'
import type { SupportCustomGet } from '../../Interface/SupportIn'
import { SlOptionsVertical } from 'react-icons/sl'
import SupportFinishedMenu from '../Modal/menu/SupportFinishedMenu'
import SupportDetailsModal from '../Modal/details/SupportDetailsModal'

function SupportsFinishedView() {

  const context = useAppContext() as AppContextIn
  const [supports, setSupports] = useState<SupportCustomGet[]>()
  const [suppId, setSuppId] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const setModal = (val: boolean) => setShowModal(val)
  function setSupportFinished(){
    const newSup = context.supports.filter(sup => sup.status == "FINALIZADO")
    setSupports(newSup)
  }




  useEffect(() => {
    setSupportFinished()
  }, [])

  useEffect(() => {
    setSupportFinished()
  }, [context.supports])



  

  return (
    <div className="support-list">

      {
        !supports ? (<div></div>) :
          supports.map((sup, id) => (
            <div key={id} className='target support-item'>
              <section className='supp-item-text-con'>
                <div className='supp-item-text-description'>
                  <p style={{ color: "green" }}>{sup.description}</p>
                </div>

                <p >{sup.categoryDev}</p>
                <p>{sup.customer}</p>
              </section>
              <section className='supp-item-foot'>
                <p>{sup.total}</p>
                <div style={{ display: "flex" }}>
                  <div className='supp-icon-con icon-menu' aria-controls="menu-btn" aria-haspopup>
                    <SlOptionsVertical 
                      onClick={() => {
                      setModal(true)
                      setSuppId(sup.id as number)
                    }} />
                  </div>
                </div>
              </section>
              <SupportFinishedMenu 
                supId={suppId}
                setThisModal={setModal} 
                showthisModal={showModal}
              />
              <SupportDetailsModal suppId={suppId}/>
            </div>
          ))
      }
    </div>
  )
}

export default SupportsFinishedView