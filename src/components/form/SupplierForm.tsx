import React, { useEffect, useState, type MouseEventHandler } from 'react'
import type { AppContextIn } from '../../Interface/InApp'
import { useAppContext } from '../../context/AppContext'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { postSupplierProRequest, updateSupplierRequest } from '../../services/Supplier.service';

function SupplierForm() {
    const context = useAppContext() as AppContextIn

    const [name, setName] = useState("");
      const [nameEmpty, setNameEmpty] = useState(false);
      
      const [telephone, setTelephone] = useState("");
      const [telephoneEmpty, setTelephoneEmpty] = useState(false);
      
      const [ruc, setRuc] = useState("");
      const [rucEmpty, setRucEmpty] = useState(false);
    
      const [address, setAddress] = useState<string>("");
      const [addressEmpy, setAddressEmpy] = useState(false);



      
    
  function cleanInput(){
    setName("");
    
    setTelephone("");
    setRuc("");
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
    if (telephone === "") {
      setTelephoneEmpty(true);
      invalid = true;
    } else {
      setTelephoneEmpty(false);
    }
    if (ruc === "") {
      setRucEmpty(true);
      invalid = true;
    } else {
      setRucEmpty(false);
    }
    if (address === "") {
      setAddressEmpy(true);
      invalid = true;
    } else {
      setAddressEmpy(false);
    }
    return invalid;
  }
  function cancel(){
    cleanInput()
    context.showFormModal(false);
    context.setSupUpddateMode(false)
  }
  async function hanldeSubmit() {
    console.log("processing submit");
    if (validateInputs()) return;

    const supplier = {
      name,
      telephone,
      ruc,
      address
    }
    try {
      if(context.isSupUpdMode){
        await updateSupplierRequest(context.supplierModify.id as number, supplier)  
      } else {
        await postSupplierProRequest(supplier)
      }
      cancel();
      context.supplierList();
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    cleanInput()
    if(context.isSupUpdMode){ 
      console.log(context.supplierModify);
      setName(context.supplierModify.name);
      setTelephone(context.supplierModify.telephone);
      setRuc(context.supplierModify.ruc);
      setAddress(context.supplierModify.address);
    }
  }, [])


  return (
    <div className="register-form">
              <section className='person-section' style={{ width: "460px" }}>
                {/* name */}
                  <div style={{ marginTop: "10px" }}>
                      <label htmlFor="username" style={{ marginTop: "10px" }}>Nombre</label>
                      <InputText
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        invalid={nameEmpty}
                      />
                      {nameEmpty &&  <small id="username-help" className='empt-ymsg'> El Ruc es requerido</small>}
                  </div>
                  {/* Telephone and Ruc */}
                   <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  
                    <div style={{ width: "48%" }}>
                      <label htmlFor="username" >Telefono</label>
                      <InputText
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        invalid={telephoneEmpty}
                      />
                      {telephoneEmpty &&  <small id="username-help" className='empt-ymsg'> El nombre es requerido</small>}
                    </div>
        
                    <div style={{ width: "48%" }}>
                      <label htmlFor="username" style={{ marginTop: "10px" }}>Ruc</label>
                      <InputText
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        variant="filled"
                        style={{ marginTop: "5px", width: "100%", height: "40px" }}
                        type="text"
                        invalid={rucEmpty}
                      />
                      {rucEmpty &&  <small id="username-help" className='empt-ymsg'> El apellido es requerida</small>}
                    </div>
                  </div>
                  {/* Address */}
                    <div style={{ marginTop: "10px" }}>
                        <label htmlFor="username" style={{ marginTop: "10px" }}>Direccion</label>
                        <InputText
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          variant="filled"
                          style={{ marginTop: "5px", width: "100%", height: "40px" }}
                          type="text"
                          invalid={addressEmpy}
                        />
                        {addressEmpy &&  <small id="username-help" className='empt-ymsg'> La direccion es requerida</small>}
                    </div>
          
                  </section>
          {/* buttons */}
          <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
                  <Button
                    label="Cancelar" outlined 
                    size='small' 
                    onClick={() => cancel()}
                    style={{ marginRight: "10px" }} />
                  <Button 
                    type='submit'
                    label="Guardar" 
                    raised 
                    onClick={() => hanldeSubmit()}
                    size='small'
                  />
                </div>
        </div>
  )
}

export default SupplierForm