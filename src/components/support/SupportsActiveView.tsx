import React from 'react'
import type { AppContextIn } from '../../Interface/InApp'
import { useAppContext } from '../../context/AppContext'

function SupportsActiveView() {

    const context = useAppContext() as AppContextIn

  return (
    <div className="support-list">
        <section 
            className=" support-btn-add"
            onClick={() => context.setShowRSidebar(true)}
        >
                  <h1>+</h1>
        </section>
        
    </div>
  )
}

export default SupportsActiveView