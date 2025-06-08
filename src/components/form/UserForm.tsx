import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { AppContextIn } from '../../Interface/InApp';

function UserForm() {

  const [selectedRoles, setSelectedRoles] = useState();
  const context = useAppContext() as AppContextIn;
  const roles = [
    { name: 'ADMINISTRADOR', code: 'ADMINISTRADOR' },
    { name: 'VENDEDOR', code: 'VENDEDOR' },
    { name: 'TECNICO', code: 'TECNICO' }
  ];

  return (
    <div className='register-form' >
      <div className='form-input-con' style={{ display: "flex" }}>
        <section className='person-section' style={{ width: "460px" }}>
          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between" }}>

            <div style={{ width: "48%" }}>
              <label htmlFor="username" >Nombre</label>
              <InputText
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="text"
              />
            </div>
            <div style={{ width: "48%" }}>
              <label htmlFor="username" style={{ marginTop: "10px" }}>Apellido</label>
              <InputText
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="text"
              />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="username" style={{ marginTop: "10px" }}>Documento</label>
            <InputText
              variant="filled"
              style={{ marginTop: "5px", width: "100%", height: "40px" }}
              type="text"
            />
          </div>

          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ width: "48%" }}>
              <label htmlFor="username" style={{ marginTop: "10px" }}>Telefono</label>
              <InputText
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="text"
              />
            </div>
            <div className="flex-auto" style={{ width: "48%" }}>
              <label htmlFor="buttondisplay" className="font-bold block mb-2">
                Button Display
              </label>
              <Calendar id="buttondisplay" showIcon style={{ height: "40px", marginTop: "5px" }} />
            </div>
          </div>

        </section>

        <section className='user-section' style={{ width: "460px", marginLeft: "20px" }}>

          <label htmlFor="username">Nombre Usuario</label>
          <InputText
            variant="filled"
            style={{ marginTop: "5px", width: "100%", height: "40px" }}
            type="text"
          />
          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>

            <div style={{ width: "48%" }}>
              <label htmlFor="username">Contraseña</label>
              <InputText
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="Password"
              />
            </div>
            <div style={{ width: "48%" }}>
              <label htmlFor="username">Confirmar Contraseña</label>
              <InputText
                variant="filled"
                style={{ marginTop: "5px", width: "100%", height: "40px" }}
                type="password"
              />
            </div>
          </div>

          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ width: "60%" }}>
              <label htmlFor="username">Rol</label>

              <Dropdown 
                value={selectedRoles} 
                onChange={(e) => setSelectedRoles(e.value)} 
                options={roles} 
                optionLabel="name"
                style={{ width: "100%", height: "40px", marginTop: "5px" }}
                placeholder="Select a City" 
                className="w-full md:w-14rem" 
              />
            </div>

          </div>
        </section>
      </div>

      {/* buttons */}
      <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button label="Cancelar" outlined size='small' style={{ marginRight: "10px" }} onClick={() => context.showFormModal(false)}/>
        <Button label="Guradar" raised size='small' />
      </div>
    </div>
  )
}

export default UserForm