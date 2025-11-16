import {type ReactNode } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn } from '../../Interface/InApp'

interface ContexArg{
  children: ReactNode
}

function RightSidebar({children}: ContexArg) {

    const context = useAppContext() as AppContextIn
  return (
    <Sidebar
        visible={context.showRSidebar}  
        position='right' 
        style={{width:"420px", height:"100%",}}
        onHide={() => {
          context.setShowRSidebar(false)
        }}
    >
            {children}
    </Sidebar>
  )
}

export default RightSidebar