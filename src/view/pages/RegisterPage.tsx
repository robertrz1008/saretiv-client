import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { type AuthContextIn } from "../../Interface/InAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"


function RegisterPage() {
  const {singIn, isAutenticate} = useAuth() as AuthContextIn
  const navigate = useNavigate()

  useEffect(() => {
    if(isAutenticate){
        navigate("/home")
        cleaninputs()
    }
  }, [isAutenticate])

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  function validate(): boolean {

    if(username == ""){
      console.log("falseo")
      alert("Username is required")
      return false
    }
    if(password == ""){
      alert("Password is required")
      return false
    }
    return true
  }


  return (
      <div className="Auth-page">
       <form className="Auth-form" onSubmit={(e) => {
        e.preventDefault()
        if(!validate()) return
        login()
      }}>
      <center><h2>Saretiv</h2></center>
        <InputText 
            type="text" 
            onChange={(e) => setUsername(e.target.value)}
            value={username }
            placeholder="username" 
        />
        <InputText 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password" 
        />
        <Button type="submit" label="Ingresar" icon="pi pi-check" />
      </form>
      </div>
  )
}

export default RegisterPage
