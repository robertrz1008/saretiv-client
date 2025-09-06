import type { AppContextIn } from "../../Interface/InApp";
import { MdDevices } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import { GrConfigure } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SupportCustomGet } from "../../Interface/SupportIn";

interface Prop{
  setDeviceTitle: (des : string) => void
}

function SupportsActiveView(prop: Prop) {

  const context = useAppContext() as AppContextIn
  const [supports, setSupports] = useState<SupportCustomGet[]>([])
  const [suppId, setSuppId] = useState(0)

  const navigate = useNavigate()


  useEffect(() => {
    if(context.supports.length > 0){
      const newSup = context.supports.filter(sup => sup.status == "ACTIVO")
      setSupports(newSup)
    }
  }, [context.supports])

  useEffect(() => {
    if(suppId){
      navigate("/SoporteTecnico/Detalles/"+suppId)
    }
  }, [suppId])




  return (
    <div className="support-list">
        <div
            className=" support-btn-add"
            onClick={() => {
              context.setShowRSidebar(true)
              context.setSupportsUpdMode(false)
            }}
        >
            <h1>+</h1>
        </div>
        {
          !supports?(<div></div>) : 
            supports.map((sup, id) => (
              <div key={id} className='target support-item'>
                  <section className='supp-item-text-con'>
                      <div className='supp-item-text-description'>
                          <p >{sup.description}</p>
                      </div>
                    
                      <p >{sup.categoryDev}</p>
                      <p>{sup.customer}</p>
                  </section>
                  <section className='supp-item-foot'>
                    <p>{sup.total}</p>
                    <div style={{display:"flex", }}>
                        <div className='supp-icon-con icon-conf'>
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
                        </div>
                    </div>
                  </section>
              </div>
            ))
        }
    </div>
  )
}

export default SupportsActiveView