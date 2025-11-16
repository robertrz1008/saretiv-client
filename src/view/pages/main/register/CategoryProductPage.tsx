import React, { useEffect, useState } from 'react'
import { getCategoryProRequest, postCategoryProRequest, updateCategoryProRequest } from '../../../../services/category.service'
import CategoryProTable from '../../../../components/tables/register/CategoryProTable'
import { Button } from 'primereact/button'
import type { AppContextIn, Category } from '../../../../Interface/InApp'
import { useAppContext } from '../../../../context/AppContext'

function CategoryProductPage() {

    const [categories, setCategories] = React.useState([])
    const [showRowRegister, setShowRowRegister] = useState(false)
    const [isbuttonEnable, setButtonEnable] = useState(false)

    const [name, setName] = React.useState<string>("");
    const [nameEmpty, setNameEmpty] = React.useState<boolean>(false);
    const [catIDModify, setCatIDModify] = React.useState(0);


    const context = useAppContext() as AppContextIn

    useEffect(() => {
        context.setGlobalTitleFn('Categorias de Productos');
    }, []);



    async function listCategories(){
        try {
            const response = await getCategoryProRequest()
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function addTypeName(string: string) {
        setName(string)
    }
    async function showregister() {
        setShowRowRegister(true)
        setButtonEnable(true)
    }
    function cancel(){
        setShowRowRegister(false)
        setButtonEnable(false)
        setNameEmpty(false)
        setCatIDModify(0)
        setName("")
        listCategories()
    }
    function validateName() {
        if (name.trim() === "") {
            setNameEmpty(true);
            return true;
        }
        return false;
    }

    async function handleSubmit() {
        if (validateName()) return;

        try {
            if (catIDModify == 0) {
                await postCategoryProRequest({ name: name });
                console.log("add")
                cancel();
                listCategories()
                return
            }
                console.log("upd")
                await updateCategoryProRequest(catIDModify, { name: name });
               
            cancel();
        } catch (error) {
            console.log(error)
        }
        setNameEmpty(false);

    }
    function selectCatModify(cat: Category) {
        setCatIDModify(cat.id as number);
        setShowRowRegister(false);
        setButtonEnable(false);
        setName(cat.name);
    }



    useEffect(() => {
        listCategories()
    }, [])

  return (
    <div className='main-con'>
        <div className='register-con'>
            <div className='register-head'>
                <Button
                 label="Nueva Cateogoria" 
                 icon="pi pi-check" 
                 size='small'
                 disabled={isbuttonEnable}
                 onClick={showregister}
                />
            </div>
            <CategoryProTable 
                showRowRegister={showRowRegister}
                isbuttonEnable={isbuttonEnable}
                categories={categories}
                name={name}
                addTypeName={addTypeName}
                cancel={cancel}
                nameEmpty={nameEmpty}
                handleSubmit={handleSubmit}
                selectCatModify={selectCatModify}
                catIDModify={catIDModify}
                listCategories={listCategories}
            />
        </div>
    </div>
  )
}

export default CategoryProductPage