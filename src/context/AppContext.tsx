import { useContext, createContext, type ReactNode, useState } from "react";
const appContext = createContext({})

export const useAuth =() => {
     const context = useContext(appContext)
        if(!context){
            throw new Error("Context invalid")
        }
        return context
}

interface ContexArg{
    children:ReactNode
}

export const AppContexProvider = ({children}: ContexArg) => {

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    function showFormModal(val: boolean) {
        setIsFormModalOpen(val);
    }


    return (
        <appContext.Provider value={{
            isFormModalOpen, showFormModal
        }}>
            {children}
        </appContext.Provider>
    )
}