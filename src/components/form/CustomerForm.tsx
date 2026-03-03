import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import type { AppContextIn } from "../../Interface/InApp";
import { createCustomertRequest, updateCustomerRequest } from "../../services/Customer.service";

function CustomerForm() {

  const context = useAppContext() as AppContextIn


  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  
  const [lastname, setLastname] = useState("");
  const [lastnameEmpty, setLastnameEmpty] = useState(false);
  
  const [telephone, setTelephone] = useState("");
  const [telephoneEmpty, setTelephoneEmpty] = useState(false);
  
  const [document, setDocument] = useState("");
  const [documentEmpty, setDocumentEmpty] = useState(false);

  const [address, setAddress] = useState<string>("");
  const [addressEmpy, setAddressEmpy] = useState(false);



  useEffect(() => {
    context.setModalFormTitle("Datos del Cliente")
    cleanInput()
    if(context.iscustUpdMode){
      setName(context.customerModify.name);
      setLastname(context.customerModify.lastname);
      setTelephone(context.customerModify.telephone);
      setDocument(context.customerModify.document);
      setAddress(context.customerModify.address);
    }
  }, [])

  function cancel(){
    cleanInput();
    context.showFormModal(false)
    context.setCustUpdateMode(false)
  }

  function cleanInput(){
    setName("");
    setLastname("");
    
    setTelephone("");
    setDocument("");
    setAddress("");
  }
  function validateInputs(){
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
    if (address === "") {
      setAddressEmpy(true);
      invalid = true;
    } else {
      setAddressEmpy(false);
    }
    return invalid;
  }
  async function hanldeSubmit(){
    if(validateInputs()) return

    const customSend={
        name: name,
        lastname: lastname,
        telephone: telephone,
        document: document,
        address: address,
        status: false
      }
      if(context.iscustUpdMode){
        await updateCustomerRequest(context.customerDoc, customSend)
      }else{
        await createCustomertRequest(customSend)
      }
      
      context.customerList()
      cancel()

  }



  return (
    <div className="register-form">
      <form className='form-input-con' style={{ display: "flex"}}>
          <section className='person-section' style={{ width: "990px" }}>
                <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between" }}>
      
                  <div style={{ width: "48%" }}>
                    <h4 style={{ marginTop: "10px" }}>Nombre</h4>
                    <InputText
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      // variant="filled"
                      style={{ marginTop: "5px", width: "100%", height: "40px" }}
                      type="text"
                      invalid={nameEmpty}
                    />
                    {nameEmpty &&  <small id="username-help" className='empt-ymsg'> El nombre es requerido</small>}
                  </div>
      
                  <div style={{ width: "48%" }}>
                    <h4 style={{ marginTop: "10px" }}>Apellido</h4>
                    <InputText
                      id="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      // variant="filled"
                      style={{ marginTop: "5px", width: "100%", height: "40px" }}
                      type="text"
                      invalid={lastnameEmpty}
                    />
                    {lastnameEmpty &&  <small id="username-help" className='empt-ymsg'> El apellido es requerida</small>}
                  </div>
                </div>
      
                <div style={{ marginTop: "10px" }}>
                  <h4 style={{ marginTop: "10px" }}>Documento</h4>
                  <InputText
                  id="document"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    // variant="filled"
                    style={{ marginTop: "5px", width: "100%", height: "40px" }}
                    type="text"
                    invalid={documentEmpty}
                  />
                  {documentEmpty &&  <small id="username-help" className='empt-ymsg'> La cedula es requerida</small>}
                </div>

                <div style={{ marginTop: "10px" }}>
                        <h4 style={{ marginTop: "10px" }}>Dirección</h4>
                        <InputText
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        // variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        invalid={addressEmpy}
                      />
                       {addressEmpy &&  <small id="username-help" className='empt-ymsg'> La direccion es requerida</small>}
                    </div>
      
                <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <div style={{ width: "48%" }}>
                      <h4 style={{ marginTop: "10px" }}>Telefono</h4>
                      <InputText
                        id="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        // variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        invalid={telephoneEmpty}
                      />
                      {telephoneEmpty &&  <small id="username-help" className='empt-ymsg'>El telefono es requerido</small>}
                    </div>
                </div>
              </section>
      </form>
      {/* buttons */}
      <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button 
                id="btn-reset"
                label="Cancelar" outlined 
                size='small' 
                onClick={() => cancel()}
                style={{ marginRight: "10px" , width:"200px"}} />
              <Button 
                id="btn-submit"
                type='submit'
                label="Guardar" 
                raised 
                onClick={hanldeSubmit}
                size='small'
                style={{ width:"200px"}}
              />
        </div>
    </div>
  )
}

export default CustomerForm