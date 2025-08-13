import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';

interface Prop{
    setSelectedRoles: (item:{name:string, code:string}) => void
    value:{name:string, code:string}
    isupdate: boolean 
}

function RoleSelect(prop: Prop) {
    
    const roles=[
    { name: 'ADMINISTRADOR', code: 'ADMINISTRADOR'},
    { name: 'VENDEDOR', code: 'VENDEDOR'},
    { name: 'TECNICO', code: 'TECNICO'}
  ]
   

    // useEffect(() => {
    //     let c =[]
    //     roles.map( data => {
    //         if(data.value){
    //             c.push(data.name)
    //             prop.setSelectedRoles(c)
    //         }
    //     })
    // },[roles])

   

  return (
    <div className="card flex justify-content-center">
            <Dropdown  
                value={prop.value}
                onChange={(e: DropdownChangeEvent) => {
                  prop.setSelectedRoles(e.value)
                  console.log(e.value)
                }} 
                style={{width:"100%"}}
                options={roles} 
                optionLabel="name"
                optionValue="code"
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
  )
}

export default RoleSelect