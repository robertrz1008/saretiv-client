import "../../../styles/Support.css"
import { InputText } from "primereact/inputtext";
import RightSidebar from "../../../../components/RightSidebar/RightSidebar";
import SupportForm from "../../../../components/form/SupportForm";
import SupportsActiveView from "../../../../components/support/SupportsActiveView"; 
import { useAppContext } from "../../../../context/AppContext";
import type { AppContextIn } from "../../../../Interface/InApp";
import { useEffect, useState } from "react";

function SupportPage() {

  const context = useAppContext() as AppContextIn
  const [_deviceDescription, setDevDescription] = useState("")

  function setDeviceTitle(des: string){
    setDevDescription(des)
  }

  useEffect(() => {
    context.listSupport()
  }, [])
    
  return (
    <div className='main-con'>
       <div className="support-con">
            <div className="support-header">
              <InputText
                // onChange={(e) => context.customerListByFilter(e.target.value)}
                type="text" 
                placeholder="Buscar Ciente" 
                style={{height:"40px", width:"320px"}}
              />
            </div>
            <SupportsActiveView setDeviceTitle={setDeviceTitle}/>
        
       </div>
       <RightSidebar>
          <SupportForm/>
       </RightSidebar>
    </div>
  )
}

export default SupportPage