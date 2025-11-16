import { Button } from "primereact/button"
import type { AppContextIn, Category } from "../../../Interface/InApp"
import { InputText } from "primereact/inputtext"
import { useAppContext } from "../../../context/AppContext"
import { useState } from "react"
import { deleteCategoryDevRequest } from "../../../services/category.service"
import { FaPen } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md"
import DeleteCategoryDevModal from "../../Modal/confirm/DeleteCategoryDevModal"

interface Prop{
    categories: Category[]
    showRowRegister: boolean
    isbuttonEnable: boolean
    name: string
    addTypeName: (string: string) => void
    cancel: () => void
    nameEmpty: boolean
    handleSubmit: () => void
    selectCatModify: (cat: Category) => void
    catIDModify: number
    listCategories: () => void
}

function CategoryDevTable(prop: Prop) {
   const context = useAppContext() as AppContextIn
    const [catID, setCatID] = useState<number>(0);


   function isCategoryModify(id: number): boolean {
        if (prop.catIDModify === id)return true
        return false
    }
    function isArray(){
        if(prop.categories.length > 0) return true
        return false
    }
    async function deleteCategory(id: number) {
        try {
            await deleteCategoryDevRequest(id)   
            prop.listCategories()
        } catch (error) {
            alert("No se puede eliminar esta categoria");
            console.error("Error deleting category:", error);
        }finally {
            context.showConfirmModal(false)
            setCatID(0)
        }
    }

    

  return (
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Nombre</th>
                    <th className='td-icon' style={{paddingRight:"10px"}}>Acción</th>
                </tr>
            </thead>
            
            {/* iterating the categories array */}
            {
                !isArray()? (
                <tbody>
                    {/* Row for adding a new category */}
                        { prop.showRowRegister && (
                            <tr className='td-icon tr-hovernone'>
                                <td className="td-id"></td>
                            <td>
                                <InputText
                                value={prop.name}
                                onChange={(e) => prop.addTypeName(e.target.value)}
                                style={{ marginTop: "5px", width: "300px", height: "40px" }}
                                type="text"
                                autoFocus
                                invalid={prop.nameEmpty}
                                />
                                 <Button
                                    onClickCapture={prop.cancel}
                                    label="Cancelar" 
                                    outlined 
                                    severity="secondary"
                                    icon="pi pi-check"
                                    size='small'
                                    onClick={() => {}}
                                    style={{ marginLeft: "10px" }}
                                />
                                <Button
                                    label="Registrar" 
                                    outlined 
                                    icon="pi pi-check"
                                    size='small'
                                    onClick={prop.handleSubmit}
                                    style={{ marginLeft: "10px" }}
                                />
                            </td>
                            <td>
                            </td>
                            
                        </tr>
                        )}
                </tbody>
            ): 
                (
                     <tbody>
                        {
                            prop.categories.map((data, id) => (
                                <tr 
                                    onClick={() =>{ }}
                                    className='td-icon tr-hovernone'
                                    key={id}
                                >
                                {/* // to modify the category */}
                                    {!isCategoryModify(data.id as number) ? (
                                       <>
                                        <td className="td-id">{id + 1}</td>
                                        <td>{data.name}</td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <div
                                                className="icon-con">
                                                <FaPen 
                                                    style={{fontSize:"20px"}}
                                                    onClick={() =>prop.selectCatModify(data)}
                                                />
                                                <MdDeleteOutline
                                                    onClick={() =>{
                                                        setCatID(data.id as number)
                                                        context.showConfirmModal(true)
                                                    }}
                                                /> 
                                            </div>
                                        </td>
                                       </>
                                    ) : (
                                        <>   <td className="td-id"></td>
                                            <td>
                                                <InputText
                                                value={prop.name}
                                                onChange={(e) => prop.addTypeName(e.target.value)}
                                                style={{ marginTop: "5px", width: "300px", height: "40px" }}
                                                type="text"
                                                autoFocus
                                                invalid={prop.nameEmpty}
                                                />
                                                <Button
                                                    onClickCapture={prop.cancel}
                                                    label="Cancelar" 
                                                    outlined 
                                                    severity="secondary"
                                                    icon="pi pi-check"
                                                    size='small'
                                                    onClick={() => {}}
                                                    style={{ marginLeft: "10px" }}
                                                />
                                                <Button
                                                    label="Registrar" 
                                                    outlined 
                                                    icon="pi pi-check"
                                                    size='small'
                                                    onClick={prop.handleSubmit}
                                                    style={{ marginLeft: "10px" }}
                                                />
                                            </td>
                                            <td>
                                            </td>
                                        </>
                                    )}
                                    <DeleteCategoryDevModal
                                        id={catID}
                                        deleteCategory={deleteCategory}
                                    />
                                </tr> 
                            ))
                        }


                        {/* Row for adding a new category */}
                        { prop.showRowRegister && (
                            <tr className='td-icon tr-hovernone'>
                                <td className="td-id"></td>
                            <td>
                                <InputText
                                value={prop.name}
                                onChange={(e) => prop.addTypeName(e.target.value)}
                                style={{ marginTop: "5px", width: "300px", height: "40px" }}
                                autoFocus
                                type="text"
                                invalid={prop.nameEmpty}
                                />
                                 <Button
                                    onClickCapture={prop.cancel}
                                    label="Cancelar" 
                                    outlined 
                                    severity="secondary"
                                    icon="pi pi-check"
                                    size='small'
                                    onClick={() => {}}
                                    style={{ marginLeft: "10px" }}
                                />
                                <Button
                                    label="Registrar" 
                                    outlined 
                                    icon="pi pi-check"
                                    size='small'
                                    onClick={prop.handleSubmit}
                                    style={{ marginLeft: "10px" }}
                                />
                            </td>
                            <td>
                            </td>
                            
                        </tr>
                        )}
                    </tbody> 
                )
            }
        </table>
  )
}

export default CategoryDevTable