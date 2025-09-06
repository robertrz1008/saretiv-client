import "../../../styles/Support.css"
import { InputText } from "primereact/inputtext";
import RightSidebar from "../../../../components/RightSidebar/RightSidebar";
import SupportForm from "../../../../components/form/SupportForm";
import SupportsActiveView from "../../../../components/support/SupportsActiveView"; 
import { useAppContext } from "../../../../context/AppContext";
import type { AppContextIn } from "../../../../Interface/InApp";
import { useEffect, useState } from "react";
import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';
import SupportsCanceledView from "../../../../components/support/SupportsCanceledView";
import SupportsFinishedView from "../../../../components/support/SupportsFinishedView";

interface Item {
    name: string;
    value: number;
}

function SupportPage() {

  const context = useAppContext() as AppContextIn
  const [_deviceDescription, setDevDescription] = useState("")
  const [viewSelected, setViewSelected] = useState<number>(0);
  
  const viewItems: Item[] = [
    {name: 'Activos', value: 1},
    {name: 'Cancelados', value: 2},
    {name: 'Finalizados', value: 3}
  ]

  function setDeviceTitle(des: string){
    setDevDescription(des)
  }

  useEffect(() => {
    context.listSupport()
    setViewSelected(1)
  }, [])
  

  function HandleSupportsView(){
    if(viewSelected == 1){
      return <SupportsActiveView setDeviceTitle={setDeviceTitle}/>
    }
    if(viewSelected == 2){
      return <SupportsCanceledView/>
    }
    if(viewSelected == 3){
      return <SupportsFinishedView/>
    }
  }
    
  return (
    <div className='main-con'>
       <div className="support-con">
            <div className="support-header flex f-jc-beetwen">
              <InputText
                // onChange={(e) => context.customerListByFilter(e.target.value)}
                type="text" 
                placeholder="Buscar Ciente" 
                style={{height:"40px", width:"320px"}}
              />
              <SelectButton 
                value={viewSelected} 
                onChange={(e: SelectButtonChangeEvent) =>setViewSelected(e.value)} 
                optionLabel="name" 
                options={viewItems} 
              />
            </div>

            { HandleSupportsView()}
        
       </div>
       <RightSidebar>
          <SupportForm/>
       </RightSidebar>
    </div>
  )
}

export default SupportPage