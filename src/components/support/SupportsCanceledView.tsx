import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import type { AppContextIn } from "../../Interface/InApp"
import type { Support, SupportCustomGet } from "../../Interface/SupportIn"
import { GrConfigure } from "react-icons/gr"

interface Prop{
  setDeviceTitle: (des : string) => void
}

function SupportsCanceledView() {
  const context = useAppContext() as AppContextIn
  const [supports, setSupports] = useState<SupportCustomGet[]>()
  const [suppId, setSuppId] = useState(0)

  useEffect(() => {
    const newSup = context.supports.filter(sup => sup.status == "CANCELADO")
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
                              <p style={{color:"red"}}>{sup.description}</p>
                          </div>
                        
                          <p >{sup.categoryDev}</p>
                          <p>{sup.customer}</p>
                      </section>
                      <section className='supp-item-foot'>
                        <p>{sup.total}</p>
                        <div style={{display:"flex", }}>
                            <div className='supp-icon-con icon-conf'>
                              <GrConfigure onClick={()=>{
                                // prop.setDeviceTitle(sup.description)
                                // setSuppId(sup.id as number)
                                
                              }}/>
                            </div>
                        </div>
                      </section>
                  </div>
                ))
            }
        </div>
      )
}

export default SupportsCanceledView