import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react';
import { postEnterpriceRequest } from '../../services/enterprise.service';
import { useAuth } from '../../context/AuthContext';
import { AuthContextIn } from '../../Interface/InAuth';

function EnterpriseForm() {
    const auth = useAuth() as AuthContextIn

    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("")


    async function handleSubmit(){
        if(!name || !telephone || !address){
            alert("Completa todos los campos")
            return
        }

        try {
            await postEnterpriceRequest({
                name: name,
                telephone: telephone,
                direction: address
            })

            auth.inicializeApp()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex f-jc-center f-ai-center' style={{width:"100%", height:"100vh"}}>
            

            <div style={{ width: "300px" }} className='target'>
                <h3>Ingreso los datos de la empresa</h3>
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="username" style={{ marginTop: "10px" }}>Nombre</label>
                    <InputText
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        // invalid={nameEmpty}
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="username" style={{ marginTop: "10px" }}>telefono</label>
                    <InputText
                        id='telephone'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        // invalid={nameEmpty}
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="username" style={{ marginTop: "10px" }}>Dirección</label>
                    <InputText
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        // invalid={nameEmpty}
                    />
                </div>
                <Button id='btn-submit' type="submit" onClick={handleSubmit} style={{marginTop: "10px", width:"100%"}} label="Guardar" icon="pi pi-check"/>
            </div>
        </div>
    )
}

export default EnterpriseForm