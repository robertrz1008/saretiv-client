import type { User } from "./InAuth"

export interface Customer{
    id?: number
    name: string,
    lastname: string,
    telephone: string,
    document: string,
    status: boolean,
    address: string
}

export interface AppContextIn{
    isFormModalOpen: boolean
    showFormModal:  (val: boolean) => void
    userUpdateMode: (val: boolean) => void
    setUserUpdate: (user: User) => void
    isUserUpdMode: boolean
    userModify: User
    showConfirmModal: (val: boolean) => void
    isShowConfirmModal: boolean
    customers: Customer[],
    customerList: () => void,
    iscustUpdMode: boolean 
    customerModify: Customer
    setCustUpdateMode: (val: boolean) => void 
    setCustUpdate: (cust: Customer) => void
    deleteCustomer: (id: number) => void
    customerListByFilter: (str: string) => void
    addUserDoc: (doc: string) => void
    userDoc: string
    addCustomerDoc: (doc: string) => void
    customerDoc: string
}