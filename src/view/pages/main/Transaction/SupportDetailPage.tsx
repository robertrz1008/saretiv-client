import { Button } from "primereact/button"
import SupportActivities from "../../../../components/support/SupportActivities"
import SupportProducts from "../../../../components/support/SupportProducts"
import { useNavigate } from "react-router-dom"

function SupportDetailPage() {

    const navigate = useNavigate()

    return (
        <div className="main-con">
            <div className="target support-detail-con">
                <div>
                    <h3>Samsung s24</h3>
                </div>
                <div className="supp-tables-con">
                    <SupportActivities/>
                    <SupportProducts/>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            label="Cancelar" outlined 
                            size='small' 
                            onClick={() => navigate("/SoporteTecnico")}
                            style={{ marginRight: "10px", width:"200px"}} 
                        />
                        <Button 
                            type='submit'
                            label="Guardar" 
                            raised 
                            style={{width:"200px"}}
                            // onClick={() => hanldeSubmit()}
                            size='small'
                        />
                    </div>
            </div>
            
        </div>
    )
}

export default SupportDetailPage