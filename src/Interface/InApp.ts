import type { User } from "./InAuth"

export interface AppContextIn{
    isFormModalOpen: boolean
    showFormModal:  (val: boolean) => void
    userUpdateMode: (val: boolean) => void
    setUserUpdate: (user: User) => void
    isUserUpdMode: boolean
    userModify: User
    showConfirmModal: (val: boolean) => void
    isShowConfirmModal: boolean
    
}