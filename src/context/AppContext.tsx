import { useContext, createContext, type ReactNode, useState } from "react";
import type { User } from "../Interface/InAuth";
import type { Customer } from "../Interface/InApp";
import { customerListRequest, deleteCustomerRequest, getCustomerByFilterRequest } from "../services/Customer.service";
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
    const [userDoc, setUserDoc] = useState("")
    //abm
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [iscustUpdMode, setCustUpdMode] = useState(false);
    const [customerModify, setCustomersModify] = useState<Customer>();
    const [customerDoc, setCustomerDoc] = useState("")






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
     function setCustUpdateMode(val: boolean){
        setCustUpdMode(val)
    }
    function setCustUpdate(cust: Customer) {
        setCustomersModify(cust)
    }
    function addUserDoc(str: string){
        setUserDoc(str)
    }


    //customer
    async function customerList() {
        try {
            const response = await customerListRequest()
            setCustomers(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    async function deleteCustomer(id: number){
        try {
            await deleteCustomerRequest(id)
            showConfirmModal(false)
            customerList()
        } catch (error) {
            console.log(error)
        }
    }
    async function customerListByFilter(str: string){
        if(str == ""){
            customerList()
            return
        }
        try {
            const res = await getCustomerByFilterRequest(str)
            setCustomers(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    function addCustomerDoc(str:string){
        setCustomerDoc(str)
    }


    return (
        <appContext.Provider value={{
            isFormModalOpen, showFormModal, showConfirmModal, isShowConfirmModal,
            userUpdateMode, setUserUpdate, isUserUpdMode, userModify, addUserDoc, userDoc,
            customers, customerList, iscustUpdMode, customerModify, setCustUpdate, setCustUpdateMode,  deleteCustomer, customerListByFilter, addCustomerDoc, customerDoc
        }}>
            {children}
        </appContext.Provider>
    )
}