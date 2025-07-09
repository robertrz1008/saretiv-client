import { useContext, createContext, type ReactNode, useState } from "react";
import type { User } from "../Interface/InAuth";
const appContext = createContext({})

export const useAppContext =() => {
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
    const [isUserUpdMode, setUserUpdMode] = useState(false)
    const [userModify, setUserToModify] = useState<User>()
    const [isShowConfirmModal, setShowConfirmModal] = useState(false)

    function showFormModal(val: boolean) {
        setIsFormModalOpen(val);
        if(!val){
            setUserUpdMode(false)
        }
    }

    function showConfirmModal(val: boolean) {
        setShowConfirmModal(val);
    }

     function userUpdateMode(val: boolean){
        setUserUpdMode(val)
    }
    function setUserUpdate(user: User) {
        setUserToModify(user)
    }


    return (
        <appContext.Provider value={{
            isFormModalOpen, showFormModal, showConfirmModal, isShowConfirmModal,
            userUpdateMode, setUserUpdate, isUserUpdMode, userModify
        }}>
            {children}
        </appContext.Provider>
    )
}