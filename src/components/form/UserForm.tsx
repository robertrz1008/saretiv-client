import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { AppContextIn } from '../../Interface/InApp';
import type { AuthContextIn, CreateUser } from '../../Interface/InAuth';
import { registerRequest, updateUserRequest } from '../../services/Auth.service';
import { useAuth } from '../../context/AuthContext';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { data } from 'react-router-dom';
import axios from 'axios';

function UserForm() {

const [roleSelect, setRoleSelect] = useState<{name:string, code:string} | null>(null)

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

 const roles=[
    { name: 'ADMINISTRADOR', code: 'ADMINISTRADOR'},
    { name: 'VENDEDOR', code: 'VENDEDOR'},
    { name: 'TECNICO', code: 'TECNICO'}
  ]



  useEffect(() =>{
    cleaninputs()
    if(context.isUserUpdMode){
      const currentUser = context.userModify
      setName(context.userModify.name);
      setLastname(currentUser.lastname);
      setTelephone(currentUser.telephone);
      setDocument(currentUser.document);
      setDateEntry(new Date(currentUser.entryDate));
      setUsername(currentUser.username);
      setRoleSelect({
        name: currentUser.roles[0].name, 
        code: currentUser.roles[0].name
      })
    }
  }, [])

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
    setRoleSelect(null)
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
          roleListName:  [roleSelect?roleSelect.name : ""]
        }
      }
      setIsError(false)
   try {
        if(context.isUserUpdMode){
          await updateUserRequest(context.userDoc , {
              name: name.trim(),
              lastname: lastname.trim(),
              telephone: telephone.trim(),
              document: document.trim(),
              username: username.trim(),
              password: context.userModify.password,
              entryDate: dateEntry as Date,
              status: true,
              roleRequest: {
              roleListName:  []
            }
          })
          
        }else{
          await registerRequest(userSend)
        }
      
        handleCancel()
        authContext.getUserList()

   } catch (error) {
      if(axios.isAxiosError(error)){
        setIsError(true)
        setErrorMsg(error.response?.data.error)
      }
      console.log(error)
    }
  }
  




  return (
    <div className='register-form' >
      <form className='form-input-con' style={{ display: "flex" }}>
        <section className='person-section' style={{ width: "460px" }}>
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

          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ width: "48%" }}>
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
            <div className="flex-auto" style={{ width: "48%" }}>
              <label htmlFor="buttondisplay" className="font-bold block mb-2">
                Button Display
              </label>
              <Calendar 
                id="buttondisplay" 
                value={dateEntry}
                onChange={(e) => setDateEntry(e.target.value)}
                showIcon 
                variant="filled"
                style={{ height: "40px", marginTop: "5px"}} 
              />
            </div>
          </div>

        </section>

        <section className='user-section' style={{ width: "460px", marginLeft: "20px" }}>

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

          <div className='doble-inputs' style={{marginTop: "10px" }}>
              <label>Seleccionar Rol</label>
             <div className="card flex justify-content-center">
                         <Dropdown  
                             value={roleSelect}
                             variant="filled"
                             onChange={(e: DropdownChangeEvent) =>setRoleSelect(e.value) }
                             style={{width:"100%"}}
                             options={roles} 
                             optionLabel="name"
                             placeholder="Select a City" className="w-full md:w-14rem" />
                     </div>

          </div>
        </section>
      </form>
      {isError &&  <small id="username-help" className='empt-ymsg'>{errorMsg}</small>}
      {/* buttons */}
      <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button 
          label="Cancelar" outlined 
          size='small' 
          style={{ marginRight: "10px" }} onClick={() => handleCancel()}
        />
        <Button 
          type='submit'
          label="Guardar" 
          raised 
          size='small' 
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default UserForm