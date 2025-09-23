import type { ReactNode } from "react"
import { useAppContext } from "../../context/AppContext"
import type { AppContextIn } from "../../Interface/InApp"
import { Sidebar } from "primereact/sidebar"

interface ContexArg{
  children: ReactNode
}

function FilterSidebar({children}: ContexArg) {
    
    const context = useAppContext() as AppContextIn 
    
  return (
    <Sidebar
        visible={context.isFilterSidebarOpen}  
        position='right' 
        style={{width:"480px", height:"100%",}}
        onHide={() => {
        context.setFilterSidebar(false)
    }}
    >
        {children}
    </Sidebar>
  )
}

export default FilterSidebar