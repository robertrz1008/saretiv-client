import React, { useEffect, useState } from 'react'

function RoleSelect() {
    const [roles, setRoles] = useState([
    { name: 'ADMINISTRADOR', code: 'ADMINISTRADOR', value: false },
    { name: 'VENDEDOR', code: 'VENDEDOR', value:false },
    { name: 'TECNICO', code: 'TECNICO', value:false }
  ])
    function handleSelect(name:string){
        setRoles(prevRoles =>
    prevRoles.map(role =>
      role.name === name
        ? { ...role, value: !role.value } // se invierte el valor del seleccionado
        : role
    )
  );
    }
    function isSel(val:boolean){
        if(val) return "role-target-selected"

        return ""
    }



  return (
    <div className='role-select-con' style={{display:"flex",}}>
        {
            roles.map((data) => (
                <div className={`role-target ${isSel(data.value)}`} onClick={() => handleSelect(data.code)}>
                    {data.name}
                </div>
            ))
        }
    </div>
  )
}

export default RoleSelect