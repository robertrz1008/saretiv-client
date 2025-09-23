import { useState } from 'react'
import type { CustomerParams, DropdownItem } from '../../Interface/InApp';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';


interface Prop{
    submitParam: (user: CustomerParams) => void
}



function CustomerFilterForm(prop: Prop) {

  const [propertyItems, _etPropertyItems] = useState<DropdownItem[]>([
    { label: "Nombre y Apellido", code: "name" },
    { label: "Direccion", code: "address" },
  ]);
  const [propertySelect, setPropertySelect] = useState<DropdownItem | null>(null)

  const [checked, setChecked] = useState(false)

  const [orderItems, _setOrderItems] = useState<DropdownItem[]>([
    { label: "Ascendente A-Z", code: "ASC" },
    { label: "Descendente Z-A", code: "DESC" },
  ]);
  const [orderSelect, setOrderSelect] = useState<DropdownItem | null>(null)


  async function handleSubmit(){
      const userToSend: CustomerParams = {
                  property: propertySelect?.code as string,
                  order: orderSelect?.code as string,
                  isActive: checked
              }
      prop.submitParam(userToSend)
  }


  return (
    <>
      <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Parametros</h3>
      <div className="support-form-inputs">
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Ordenar por</label>
          <Dropdown
            variant="filled"
            options={propertyItems}
            value={propertySelect}
            onChange={(e: DropdownChangeEvent) => setPropertySelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            // key={`customer-${customerSelect?.code || 'empty'}`}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          // invalid={customerEmpty}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Orden</label>
          <Dropdown
            variant="filled"
            options={orderItems}
            value={orderSelect}
            onChange={(e: DropdownChangeEvent) => setOrderSelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            // key={`customer-${customerSelect?.code || 'empty'}`}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          // invalid={customerEmpty}
          />
        </div>

        <div className="flex f-ai-center f-jc-beetwen" style={{ marginTop: "10px", width: "100%" }}>
          <label>Activo</label>
          <InputSwitch checked={checked} style={{ marginLeft: "10px" }} onChange={(e) => setChecked(e.value)} />
        </div>



        <div style={{ width: "340px", position: "absolute", bottom: "10px", right: "20px" }}>
          <Button
            onClick={handleSubmit}
            label="Filtrar"
            style={{ width: "100%", marginTop: "10px" }}
            size="small"
          />
        </div>
      </div>
    </>
  )
}

export default CustomerFilterForm