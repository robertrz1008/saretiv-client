import { useState } from "react";
import "../../../styles/Support.css"
import { InputText } from "primereact/inputtext";
import { useAppContext } from "../../../../context/AppContext";
import type { AppContextIn } from "../../../../Interface/InApp";
import RightSidebar from "../../../../components/RightSidebar/RightSidebar";
import SupportForm from "../../../../components/form/SupportForm";
import SupportsActiveView from "../../../../components/support/SupportsActiveView";

function SupportPage() {
    
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
            <SupportsActiveView/>
        
       </div>
       <RightSidebar>
          <SupportForm/>
       </RightSidebar>
    </div>
  )
}

export default SupportPage