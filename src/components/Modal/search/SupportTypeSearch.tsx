import { useEffect, useState } from "react"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import type { SupportTypeGet } from "../../../Interface/SupportIn"

interface Prop { 
  showthisModal: boolean
  setThisModal: (val: boolean) => void
}

function SupportTypeSearch(prop: Prop) {

  const context = useAppContext() as AppContextIn
  const [thisSupportTypes, setThisSupportTypes] = useState<SupportTypeGet[]>([])


  function hanldeSelect(supType: SupportTypeGet){
    context.addActivitesToList({
      support: null,
      supportType: supType,
      isSaved: false
    })
    prop.setThisModal(false)
  }


  useEffect(() => {
    context.listSupportType()
  },[])

  useEffect(() => {
    //listing by this category
    if(context.supportCurrent){
      const currentSup = context.supportCurrent.categoryDev
      const newList = context.supportTypes.filter((sup: SupportTypeGet) => sup.category.name == currentSup)
      setThisSupportTypes(newList)
    }
  }, [context.supportTypes])




  return (
    <Dialog header={"Seleccionar Actividad"} visible={prop.showthisModal} style={{ marginTop: "50px" }} onHide={() => { prop.setThisModal(false) }}>
        <div className='search-con'>
            <InputText
              // value={description}
              variant="filled"
              // onChange={(e) => setDescription(e.target.value)}
              placeholder="Buscar"
              style={{ width: "100%"}}
            />

            <div className="sale-form-list-con">
          <table className="sale-table-con">
            <thead>
              <tr >
                <th>Descripción</th>
                {/* <th className="td-price">Precio</th> */}
                <th className="td-number">Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                !thisSupportTypes? 
                        ( <tr></tr> ) : 
                        thisSupportTypes.map((pro, id) => (
                          <tr
                            key={id}
                            onClick={() => hanldeSelect(pro)}
                            className="sale-table-tr"
                            style={{ height: "40px" }}
                          >
                            <td>{pro.description}</td>
                            <td className="td-number">{pro.amount}</td>
                          </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
        </div>
    </Dialog>

  )
}

export default SupportTypeSearch