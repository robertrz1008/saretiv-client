import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn } from '../../Interface/InApp'
import type { SupportCustomGet } from '../../Interface/SupportIn'

function SupportsFinishedView() {

    const context = useAppContext() as AppContextIn
    const [supports, setSupports] = useState<SupportCustomGet[]>()
    const [suppId, setSuppId] = useState(0)

    useEffect(() => {
        const newSup = context.supports.filter(sup => sup.status == "FINALIZADO")
        setSupports(newSup)
    }, [])

  return (
        <div className="support-list">
            
            {
              !supports?(<div></div>) : 
                supports.map((sup, id) => (
                  <div key={id} className='target support-item'>
                      <section className='supp-item-text-con'>
                          <div className='supp-item-text-description'>
                              <p style={{color:"green"}}>{sup.description}</p>
                          </div>
                        
                          <p >{sup.categoryDev}</p>
                          <p>{sup.customer}</p>
                      </section>
                      <section className='supp-item-foot'>
                        <p>{sup.total}</p>
                        <div style={{display:"flex"}}>
                            {/* <div className='supp-icon-con icon-conf'>
                              <GrConfigure onClick={()=>{
                                prop.setDeviceTitle(sup.description)
                                setSuppId(sup.id as number)
                                
                              }}/>
                            </div>
                            <div className='supp-icon-con icon-dev'>
                              <MdDevices
                                onClick={() => {
                                  context.setShowRSidebar(true)
                                  context.setSupportsUpdMode(true)
                                  context.setSupportModify(sup)
                                }}
                              />
                            </div> */}
                        </div>
                      </section>
                  </div>
                ))
            }
        </div>
      )
}

export default SupportsFinishedView