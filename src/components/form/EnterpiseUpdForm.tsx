import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import type { AppContextIn, Enterprice } from '../../Interface/InApp'
import { useAuth } from '../../context/AuthContext'
import type { AuthContextIn } from '../../Interface/InAuth'
import { putEnterpriceRequest } from '../../services/enterprise.service'

interface Prop{
    enterprise: Enterprice
}

function EnterpiseUpdForm(prop: Prop) {

    const context = useAppContext() as AppContextIn
    const contextAuth = useAuth() as AuthContextIn
    

    const [name, setName] = useState("")
    const [nameEmpty, setNameEmpty] = useState(false)

    const [address, setAddress] = useState("")
    const [addressEmpty, setAddressEmpty] = useState(false)

    const [telephone, setTelephone] = useState("")
    const [telephoneEmpty, setTelephoneEmpty] = useState(false)




    function setUp(){
        setName(prop.enterprise.name)
        setAddress(prop.enterprise.direction)
        setTelephone(prop.enterprise.telephone)
    }
    function handleCancel(){
        context.handleEnterpriseModal(false)
    }
    function validateInptuts(): boolean {
        let invalid: boolean = false;
        if (name === "") {
        setNameEmpty(true);
        invalid = true;
        } else {
        setNameEmpty(false);
        }

        if (address === "") {
        setAddressEmpty(true);
        invalid = true;
        } else {
        setAddressEmpty(false);
        }

        if (telephone === "") {
        setTelephoneEmpty(true);
        invalid = true;
        } else {
        setTelephoneEmpty(false);
        }

        return invalid;
    }

    async function handleSubmit(){
        if(validateInptuts()) return 

        const objDAO: Enterprice = {
            name: name,
            direction: address,
            telephone: telephone
        }
        try {
            await putEnterpriceRequest(
                contextAuth.enterprise.id as number,
                objDAO
            )
            contextAuth.getEnterprise()
            handleCancel()
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        setUp()
    }, [])



    return (
        <div className="register-form" style={{ width: "400px" }}>
            <div>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Nombre</label>
                <InputText
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="filled"
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                    type="text"
                invalid={nameEmpty}
                />
                {nameEmpty &&  <small id="username-help" className='empt-ymsg'>El nombre es requerido</small>}
            </div>
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>telefono</label>
                <InputText
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value as string)}
                    variant="filled"
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                    type="tel"
                invalid={telephoneEmpty}
                />
                {telephoneEmpty &&  <small id="username-help" className='empt-ymsg'>El telefono es requerido</small>}
            </div>
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Dirección</label>
                <InputText
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    variant="filled"
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                    type="text"
                invalid={addressEmpty}
                />
                {addressEmpty &&  <small id="username-help" className='empt-ymsg'>La dirección es requerida</small>}
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button
                    label="Cancelar" outlined
                    size='small'
                    onClick={() => handleCancel()}
                    style={{ marginRight: "10px" }}
                />
                <Button
                    type='submit'
                    label="Guardar"
                    raised
                    onClick={() => handleSubmit()}
                    size='small'
                />
            </div>
    </div >
  )
}

export default EnterpiseUpdForm