import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'

interface Prop{
    setPassFormModal: (val: boolean) => void
    showPassModal: boolean
    id: number
}

function PasswordForm(prop: Prop) {

    const [password, setPassword] = useState("")
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    
    const [password2, setPassword2] = useState("");
    const [password2Empty, setPassword2Empty] = useState(false)

    const [passwordError, setPassErrorMsg] = useState("")




    function cancel(){
        setPassword("")
        setPassword2("")
        setPassword2Empty(false)
        setPasswordEmpty(false)
        prop.setPassFormModal(false)
    }
    function validateInputs(){
        let invalid: boolean = false;
        if (password == "") {
            setPasswordEmpty(true);
            invalid = true;
        } else {
            setPasswordEmpty(false);
        }
        if (password2 == "") {
            setPassword2Empty(true);
            setPassErrorMsg("La contraseña es requerida")
            invalid = true;
        } else {
            setPassword2Empty(false);
        }
      return invalid
    }

    function validateSubmit(): boolean{
    if (validateInputs()) return false

    if( password2 != password){
      setPassword2Empty(true)
      setPassErrorMsg("No coincide la contraseña")
      return false
    }
    return true
  }
    

  return (
     <Dialog header="Cambiar contraseña" position='top' visible={prop.showPassModal} style={{ marginTop:"50px"}} onHide={() => {prop.setPassFormModal(false)}}>
         <form className='register-form' style={{width: "300px"}}>
           <div style={{ width: "100%" }}>
              <label htmlFor="username" style={{ marginTop: "10px" }}>Contraseña</label>
              <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="password"
                invalid={passwordEmpty}
              />
              {passwordEmpty &&  <small id="username-help" className='empt-ymsg'> Ingresa la contraseña </small>}
            </div>
            <div style={{ width: "100%" }}>
              <label htmlFor="username" style={{ marginTop: "10px" }}>Confirmar Contraseña</label>
              <InputText
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="password"
                invalid={password2Empty}
              />
              {password2Empty &&  <small id="username-help" className='empt-ymsg'>{passwordError}</small>}
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button
                      label="Cancelar" outlined 
                      size='small' 
                      type='reset'
                      style={{ marginRight: "10px" }} onClick={cancel}
                    />
                    <Button 
                      type='submit'
                      label="Guardar" 
                      raised 
                      size='small' 
                      onClick={(e) => {
                        e.preventDefault()
                        validateSubmit()
                      }}
                    />
                  </div>
         </form>
    </Dialog>
      
  )
}

export default PasswordForm