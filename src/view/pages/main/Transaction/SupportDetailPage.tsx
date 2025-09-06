import { Button } from "primereact/button"
import SupportActivities from "../../../../components/support/SupportActivities"
import SupportProducts from "../../../../components/support/SupportProducts"
import { useNavigate, useParams } from "react-router-dom"
import { useAppContext } from "../../../../context/AppContext"
import type { AppContextIn } from "../../../../Interface/InApp"
import { useEffect, useState } from "react"
import type { SupportCustomGet, SuppProductDetail } from "../../../../Interface/SupportIn"
import type { ActivityGet } from "../../../../Interface/Activities"

function SupportDetailPage() {

    const navigate = useNavigate()
    const param = useParams()
    const context = useAppContext() as AppContextIn

    const [btnDisabled, setBtnDisabled] = useState(true)







    function setSupports(){
        let sup = context.supports.filter(sup => sup.id == param.id)
        context.setSupportCurrent(sup[0])
    }
    function cancel(){
        navigate("/SoporteTecnico")
        context.suppDetailConcel()
    }
    function handleButtom(){
        if (setProductsDetailnotSaved().length > 0 || setActivitiesnotSaved().length > 0 ) {
            setBtnDisabled(false)
            return
        }
        setBtnDisabled(true)
    }
    function setProductsDetailnotSaved(): SuppProductDetail[]{
        const pro: SuppProductDetail[] = context.supProDetail.filter(pro => pro.isSaved == false);
        return pro
    }
    function setActivitiesnotSaved(): ActivityGet[]{
        const act: ActivityGet[] = context.activities.filter((act: ActivityGet) => act.isSaved == false)
        return act
    }
    async function beforeRegister(){
        const resultPro = await context.registerSupportDetails( 
            context.supportCurrent as SupportCustomGet,
            setProductsDetailnotSaved(),
            setActivitiesnotSaved()
        )

        if(!resultPro){
            alert("No se pudo realizar la transaccion")
            return 
        }
        cancel()

    }




    useEffect(() => {
        setSupports() 
    }, [])

    useEffect(() => {
        handleButtom()
    }, [context.activities, context.supProDetail])
    
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
                            disabled={btnDisabled}  
                            onClick={beforeRegister}
                            size='small'
                        />
                </section>
            </div>
            
        </div>
    )
}

export default SupportDetailPage