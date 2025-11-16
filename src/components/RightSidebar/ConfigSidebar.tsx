import { useAppContext } from '../../context/AppContext'
import { Sidebar } from 'primereact/sidebar';
import type { AppContextIn } from '../../Interface/InApp'
import { useAuth } from '../../context/AuthContext';
import type { AuthContextIn } from '../../Interface/InAuth';
import { GoPencil } from "react-icons/go";


function ConfigSidebar() {
    const context = useAppContext() as AppContextIn
    const { enterprise } = useAuth() as AuthContextIn


    function handleText(str: string){
        return str? str : "cargando..."
    }



    return (
        <Sidebar visible={context.showConfigSidebar} position='right' style={{ width: "360px", height: "100%", }}
            onHide={() => context.handleConfigSidebar(false)}
        >
            <div>
                <>
                    <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Configuracíon</h3>

                    <section className='config-enterprise-section'>

                        <div style={{width:"100%"}} className='flex f-jc-beetwen'>
                            <h4 >Datos de la empresa</h4>
                            <div className='supp-icon-con icon-conf'>
                                <GoPencil
                                    onClick={() => context.handleEnterpriseModal(true)}
                                />
                            </div>
                        </div>
                        <div className='target-grey'>
                            <div className='flex'>
                                <h4>Nombre: </h4>
                                <p style={{ marginLeft: "10px" }}>{handleText(enterprise.name)}</p>
                            </div>
                            <div className='flex'>
                                <h4>Dirección: </h4>
                                <p style={{ marginLeft: "10px" }}>{handleText(enterprise.direction)}</p>
                            </div>
                            <div className='flex'>
                                <h4>Teléfono: </h4>
                                <p style={{ marginLeft: "10px" }}>{handleText(enterprise.telephone)}</p>
                            </div>
                        </div>
                    </section>
                </>
            </div>
        </Sidebar>
    )
}

export default ConfigSidebar