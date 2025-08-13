import { useEffect } from "react"
import { useAppContext } from "../../../context/AppContext"
import type { AppContextIn } from "../../../Interface/InApp"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

interface Prop { 
  showthisModal: boolean
  setThisModal: (val: boolean) => void
}

function SupportTypeSearch(prop: Prop) {

  const context = useAppContext() as AppContextIn

  useEffect(() => {
    context.listSupportType()
  },[])

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
                !context.supportTypes? 
                        ( <tr></tr> ) : 
                        context.supportTypes.map((pro, id) => (
                          <tr
                            key={id}
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