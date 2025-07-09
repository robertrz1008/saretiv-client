import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Role } from '../../Interface/InAuth';

interface Prop{
    setSelectedRoles: Dispatch<SetStateAction<string[]>>
    value:Role[]
    isupdate: boolean 
}

function RoleSelect(prop: Prop) {
    const [roles, setRoles] = useState([
    { name: 'ADMINISTRADOR', code: 'ADMINISTRADOR', value: false },
    { name: 'VENDEDOR', code: 'VENDEDOR', value:false },
    { name: 'TECNICO', code: 'TECNICO', value:false }
  ])
    function handleSelect(name:string){

        if(prop.isupdate) return

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

    useEffect(() => {
        let c =[]
        roles.map( data => {
            if(data.value){
                c.push(data.name)
                prop.setSelectedRoles(c)
            }
        })
    },[roles])

    useEffect(() => {
        if(!prop.isupdate) return

        //charge the roles value to true if the prop.value contains the role
        if(prop.value.length > 0){
            setRoles(prevRoles =>
                prevRoles.map(role =>
                    prop.value.some(r => r.name === role.name)
                        ? { ...role, value: true } // si el rol ya existe, se marca como seleccionado
                        : { ...role, value: false } // si no, se desmarca
                )
            )
        }
         console.log(prop.value)
    }, [])

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