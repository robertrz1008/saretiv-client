import { Button } from "primereact/button"
import SupportActivities from "../../../../components/support/SupportActivities"
import SupportProducts from "../../../../components/support/SupportProducts"
import { useNavigate, useParams } from "react-router-dom"
import { useAppContext } from "../../../../context/AppContext"
import type { AppContextIn } from "../../../../Interface/InApp"
import { useEffect } from "react"
import type { SupportCustomGet, SuppProductDetail } from "../../../../Interface/SupportIn"

function SupportDetailPage() {

    const navigate = useNavigate()
    const param = useParams()
    const context = useAppContext() as AppContextIn



    function setSupports(){
        let sup = context.supports.filter(sup => sup.id == param.id)
        context.setSupportCurrent(sup[0])
    }
    function cancel(){
        navigate("/SoporteTecnico")
        context.suppDetailConcel()
    }
    function setProductsDetailnotSaved(): SuppProductDetail[]{
        const pro: SuppProductDetail[] = context.supProDetail.filter(pro => pro.isSaved == false);

        return pro
    }
    async function afterRegister(){
        const result = await context.registerSupportDetails( 
            context.supportCurrent as SupportCustomGet,
            setProductsDetailnotSaved()
        )

        if(!result){
            alert("No se pudo realizar la transaccion")
            return 
        }
        cancel()

    }



    useEffect(() => {
        setSupports()
        
    }, [])
    useEffect(() => {
        const thisSup = context.supportCurrent
        if(thisSup){
            context.getSupportDetials(thisSup.id as number)
        }
    }, [context.supportCurrent])
    
    

    return (
        <div className="main-con">
            <div className="target support-detail-con">
                <section>
                    <h3>{context.supportCurrent?.description}</h3>
                </section>

                <section className="supp-tables-con">
                    <SupportActivities/>
                    <SupportProducts/>
                </section>

                <section>
                    <h2>Total: {context.supTotal}</h2>
                </section>

                <section style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            label="Cancelar" outlined 
                            size='small' 
                            onClick={() => cancel()}
                            style={{ marginRight: "10px", width:"200px"}} 
                        />
                        <Button 
                            type='submit'
                            label="Guardar" 
                            raised 
                            style={{width:"200px"}}
                            onClick={afterRegister}
                            size='small'
                        />
                </section>
            </div>
            
        </div>
    )
}

export default SupportDetailPage