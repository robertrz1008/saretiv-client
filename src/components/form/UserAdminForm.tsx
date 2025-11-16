import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react'
import { registerRequest } from '../../services/Auth.service';
import axios from 'axios';
import { AuthContextIn, CreateUser } from '../../Interface/InAuth';
import { AppContextIn } from '../../Interface/InApp';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

function UserAdminForm() {
  
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  
  const [lastname, setLastname] = useState("");
  const [lastnameEmpty, setLastnameEmpty] = useState(false);
  
  const [telephone, setTelephone] = useState("");
  const [telephoneEmpty, setTelephoneEmpty] = useState(false);
  
  const [document, setDocument] = useState("");
  const [documentEmpty, setDocumentEmpty] = useState(false);
   
  const [dateEntry, setDateEntry] = useState<Date | null>();
  const [_dateEntryEmpty, setDateEntryEmpty] = useState(false);
  
  const [username, setUsername] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  
  const [password, setPassword] = useState("");
  const [passwordError, setPassErrorMsg] = useState("")
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  
  const [password2, setPassword2] = useState("");
  const [password2Empty, setPassword2Empty] = useState(false)
  
  const [errorMsg, setErrorMsg] = useState("")
  const [isError, setIsError] = useState(false)
  
  const context = useAppContext() as AppContextIn;
  const authContext = useAuth() as AuthContextIn
  
    function cleaninputs(){
      setName("");
      setLastname("");
      setTelephone("");
      setDocument("");
      setDateEntry(null);
      setUsername("");
      setPassword("");
      setPassword2("");
      setPassErrorMsg("")
      setNameEmpty(false);
      setLastnameEmpty(false);
      setTelephoneEmpty(false);
      setDocumentEmpty(false);
      setDateEntryEmpty(false);
      setUsernameEmpty(false);
      setPasswordEmpty(false);
      setPassword2Empty(false);
  
    }
  
    function handleCancel() {
      context.userUpdateMode(false)
      cleaninputs()
      setErrorMsg("")
      setIsError(false)
      context.showFormModal(false)
    }
  
    function validateInputs(): boolean {
      let invalid: boolean = false;
      if (name === "") {
        setNameEmpty(true);
        invalid = true;
      } else {
        setNameEmpty(false);
      }
      if (lastname === "") {
        setLastnameEmpty(true);
        invalid = true;
      } else {
        setLastnameEmpty(false);
      }
      if (telephone === "") {
        setTelephoneEmpty(true);
        invalid = true;
      } else {
        setTelephoneEmpty(false);
      }
      if (document === "") {
        setDocumentEmpty(true);
        invalid = true;
      } else {
        setDocumentEmpty(false);
      }
      if (username === "") {
        setUsernameEmpty(true);
        invalid = true;
      } else {
        setUsernameEmpty(false);
      }
      if (!context.isUserUpdMode && password === "") {
        setPasswordEmpty(true);
        invalid = true;
      } else {
        setPasswordEmpty(false);
      }
      if (!context.isUserUpdMode && password2 === "") {
        setPassword2Empty(true);
        setPassErrorMsg("La contraseña es requerida")
        invalid = true;
      } else {
        setPassword2Empty(false);
      }
  
      return invalid;
    }
  
    function validateSubmit(): boolean{
      if (validateInputs()) return false
  
      if(!context.isUserUpdMode && password2 != password){
        setPassword2Empty(true)
        setPassErrorMsg("No coincide la contraseña")
        return false
      }
      return true
    }
  
  
    async function handleSubmit() {
  
      if(!validateSubmit()) return
  
      const userSend: CreateUser={
          name: name.trim(),
          lastname: lastname.trim(),
          telephone: telephone.trim(),
          document: document.trim(),
          username: username.trim(),
          password: password,
          entryDate: dateEntry as Date,
          status: true,
          roleRequest: {
            roleListName:  ["ADMINISTRADOR"]
          }
        }
        setIsError(false)
     try {
         
          await registerRequest(userSend)

          await authContext.singIn({
            username: username,
            password: password
          })
        
          handleCancel()
  
     } catch (error) {
        if(axios.isAxiosError(error)){
          setIsError(true)
          setErrorMsg(error.response?.data.error)
        }
        console.log(error)
      }
    }
    
  
  
  
  
    return (
      <div className='register-form target flex f-jc-center f-ai-center' style={{ width: "100%", height:"100vh", backgroundColor:"#f0f0f0"}}>
        
        <form className='form-input-con target' style={{width:"460px"}}>

          <center><h3 className='title'>Registrarse como Administrador</h3></center>

          <section className='person-section' style={{ width: "100%", marginTop:"10px"}}>
            <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between" }}>
  
              <div style={{ width: "48%" }}>
                <label htmlFor="username" >Nombre</label>
                <InputText
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                  style={{ marginTop: "5px", width: "100%", height: "40px" }}
                  type="text"
                  invalid={nameEmpty}
                />
                {nameEmpty &&  <small id="username-help" className='empt-ymsg'> El nombre es requerido</small>}
              </div>
  
              <div style={{ width: "48%" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Apellido</label>
                <InputText
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  variant="filled"
                  style={{ marginTop: "5px", width: "100%", height: "40px" }}
                  type="text"
                  invalid={lastnameEmpty}
                />
                {lastnameEmpty &&  <small id="username-help" className='empt-ymsg'> El apellido es requerida</small>}
              </div>
            </div>
  
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="username" style={{ marginTop: "10px" }}>Cedula</label>
              <InputText
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="text"
                invalid={documentEmpty}
              />
              {documentEmpty &&  <small id="username-help" className='empt-ymsg'> La cedula es requerida</small>}
            </div>
  
              <div style={{  marginTop: "10px" }}>
                <label htmlFor="username" style={{ marginTop: "10px" }}>Telefono</label>
                <InputText
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  variant="filled"
                  style={{ marginTop: "5px", width: "100%", height: "40px" }}
                  type="text"
                  invalid={telephoneEmpty}
                />
                {telephoneEmpty &&  <small id="username-help" className='empt-ymsg'>El telefono es requerido</small>}
              </div>

            <label htmlFor="username">Nombre Usuario</label>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              style={{ marginTop: "5px", width: "100%", height: "40px" }}
              type="text"
              invalid={usernameEmpty}
            />
            {usernameEmpty &&  <small id="username-help" className='empt-ymsg'> El nombre de usuario es requerida</small>}
            <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
  
              <div style={{ width: "48%" }}>
                <label htmlFor="username">Contraseña</label>
                <InputText
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  style={{ marginTop: "5px", width: "100%", height: "40px" }}
                  type="Password"
                  disabled={context.isUserUpdMode}
                  invalid={passwordEmpty}
                />
                {passwordEmpty &&  <small id="username-help" className='empt-ymsg'> La contraseña es requerida</small>}
              </div>
              <div style={{ width: "48%" }}>
                <label htmlFor="username">Confirmar Contraseña</label>
                <InputText
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  variant="filled"
                  style={{ marginTop: "5px", width: "100%", height: "40px" }}
                  type="password"
                  disabled={context.isUserUpdMode}
                  invalid={password2Empty} 
                />
                {password2Empty &&  <small id="username-help" className='empt-ymsg'>{passwordError}</small>}
              </div>
            </div>
  
          </section>
  
          <Button 
            type='submit'
            label="Guardar e ingresar" 
            style={{marginTop:"10px", width:"100%"}}
            raised 
            size='small' 
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          />
        </form>
        {isError &&  <center style={{marginTop:"15px"}}><p id="username-help" className='empt-ymsg'>{errorMsg}</p></center>}
        {/* buttons */}
        
      </div>
    )
}

export default UserAdminForm