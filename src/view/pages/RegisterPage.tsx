import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { type AuthContextIn } from "../../Interface/InAuth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../styles/Auth.css"


function RegisterPage() {
  const {singIn, isAutenticate, buttonDisable, loginResponse} = useAuth() as AuthContextIn
  const navigate = useNavigate()

  useEffect(() => {
    if(isAutenticate){
        navigate("/home")
        cleaninputs()
    }
  }, [isAutenticate])

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameEmty, setUsernameEmty] = useState<boolean>(false);
  const [passwordEmty, setPasswordEmty] = useState<boolean>(false);

  const cleaninputs = () => {
    setUsername("");
    setPassword("");
  }


  const login = async () => {
    const loginUser = {
      username: username,
      password: password
    }
    try {
      await singIn(loginUser);
    } catch (error) {
      console.log(error)
    }
  }

  function validateInputs(): boolean {
    let invalid: boolean = false;
    if(username == "") {
      setUsernameEmty(true)
      invalid = true;
    }else{
      setUsernameEmty(false)
      
    }
    if(password == "") {
      setPasswordEmty(true)
      invalid = true;
    }else{
      setPasswordEmty(false)
    }
  
    return invalid? false : true;
  }
  function handleSebmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    login()
  }


  return (
      <div className="Auth-page">
       <form className="Auth-form" onSubmit={handleSebmit}>
      <div className="auth-title">
         <img src={logo} alt="Logo" className="auth-logo" width={250} height={80}/>
      </div>
      <div className="auth-form-line"></div>
      <center className="auth-subtitle"><h2>Autenticarse</h2></center>
        <InputText 
            variant="filled"
            style={{marginTop: "10px"}}
            type="text" 
            onChange={(e) => setUsername(e.target.value)}
            value={username }
            placeholder="Nombre de Usuario" 
            invalid={usernameEmty}
        />
        {usernameEmty && <small id="username-help" style={{color: "red", marginLeft: "10px"}}> El nombre es requetido </small>}
       
        <InputText 
            variant="filled"
            style={{marginTop: "10px"}}
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Contraseña" 
            invalid ={passwordEmty}
        />
        {passwordEmty &&  <small id="username-help" style={{color: "red", marginLeft: "10px"}}> La contraseña es requerida</small>}

        <Button type="submit" style={{marginTop: "10px"}} label="Ingresar" icon="pi pi-check" disabled={buttonDisable}/>

        {loginResponse && !loginResponse.status && 
          <small id="username-help" style={{color: "red", marginLeft: "10px", fontSize:"14px", marginTop: "10px"}}>
            {loginResponse.message}
          </small>
        }

      </form>
      </div>
  )
}

export default RegisterPage
