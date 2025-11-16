import { useContext, createContext, type ReactNode, useState, useEffect} from "react";
import { Role, type CreateUser, type LoginResponse, type Profile, type User, type UserLogin, type UserParams, } from "../Interface/InAuth";
import { createRolesAtomaticRequest, deleteUserRequest, deleteUserRoleByUserRequest, getRolesRequest, getUserByFilterRequest, getUserByParamsRequest, loginRequest, logoutRequest, profileRequest, registerRequest, usersListRequest } from "../services/Auth.service";
import type { AxiosResponse, AxiosError } from "axios";
import { getEnterpriceRequest } from "../services/enterprise.service";
import type { Enterprice } from "../Interface/InApp";
import Cookies from "js-cookie"

const appContext = createContext({})

export const useAuth = () => {
    const context = useContext(appContext)
    if (!context) {
        throw new Error("Context invalid")
    }
    return context
}

interface ContexArg {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: ContexArg) => {

    const [user, setUser] = useState<Profile>()

    const [isAutenticate, setIstAutenticate] = useState<boolean>(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const [loginResponse, setLoginResponse] = useState<LoginResponse>()
    const [isEnteprice, setIsEnteprice] = useState(false)
    const [userList, setUserList] = useState<User[]>([])
    const [enterprise, setEnterprise] = useState<Enterprice>()

    const cookies = Cookies.get()

    
    const singIn = async (user: UserLogin) => {
        setAuthLoading(true)
        //buttonDisable
        setButtonDisable(true)

        try {
            const response: AxiosResponse<LoginResponse> = await loginRequest(user)
            // setAuthLoading(false)
            inicializeApp()

            //buttonEnable
            // setIstAutenticate(true)
            setButtonDisable(false)

            if (!response.data.status) {
                setAuthLoading(false)
                setButtonDisable(false)
                setLoginResponse(response.data)
                return
            }

        } catch (error: AxiosError<LoginResponse> | any) {

            if (error.response?.data) {
                setLoginResponse(error.response?.data)
            } else {
                alert("No se puede conectar con el servidor")
            }

            setAuthLoading(false)
            setButtonDisable(false)
            // etErrors(error.response?.data)
        }
    }

    const checkLogin = async () => {
        
        setLoading(true)

        if(!cookies) return false

        try {
            const response = await profileRequest()
            setUser(response.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function verifyRoles() {
        let res: AxiosResponse<Role[]>;
        try {
            res = await getRolesRequest()
        } catch (error) {
            alert("No se pudo conectar con el servidor")
            return false
        }

        if (res.data.length > 0) return true

        try {
            await createRolesAtomaticRequest()
            return true
        } catch (error) {
            console.log(error)
            
            return false
        }
    }

    async function inicializeApp() {
        setLoading(true)
        //role
        const isRoles = await verifyRoles()
        if (!isRoles) {
            setLoading(false)
            return
        }

        //admin
        const isUsers = await usersListRequest()
        if (isUsers.data.length == 0) {
            setIsAdmin(false)

        } else {
            setIsAdmin(true)

            //authenticacion
            const isAuthenticate = await checkLogin()
            

            if (!isAuthenticate) {
                setIstAutenticate(false)
                // return
            }else{

                setIstAutenticate(true)
                const isEnterpriseResponse = await getEnterprise()
                if(!isEnterpriseResponse){
                    setIsEnteprice(false)
                }else{
                    setIsEnteprice(true)
                }
            }       
        }
        
        setLoading(false)

    }


    async function getEnterprise() {
        console.log("getting enterprise")
        const response: AxiosResponse<Enterprice[]> = await getEnterpriceRequest()
        setEnterprise(response.data[0])

        if (response.data.length == 0) return false

        return true
    }
    const createUser = async (user: CreateUser) => {
        try {
            console.log("creating")
            await registerRequest(user)
            getUserList()
        } catch (error) {
            console.log(error)
        }
    }
    async function getUserList() {
        try {
            const response = await usersListRequest()
            setUserList(response.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async function getUserListByParams(user: UserParams) {
        try {
            const response = await getUserByParamsRequest(user)
            setUserList(response.data)
            return true
        } catch (error) {
            return false
            console.log(error)
        }
    }
    async function deleteUser(id: number): Promise<boolean> {
        // if(id = user?.id as number){
        //     alert("no se puede eliminar al administrador")
        //     return false
        // }
        try {
            await deleteUserRoleByUserRequest(id)
            await deleteUserRequest(id)
            getUserList()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async function listUserByFilter(filter: string) {
        if (filter.length < 1) {
            getUserList()
            return
        }

        try {
            const response = await getUserByFilterRequest(filter)
            setUserList(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function logout() {
        try {
            setAuthLoading(true)
            await logoutRequest()
            setIstAutenticate(false)
            setUser(undefined)
            setLoginResponse(undefined)
            setButtonDisable(false)
            setAuthLoading(false)
            return true
        } catch (error) {
            console.log(error)
            setAuthLoading(false)
            return false
        }
    }



    useEffect(() => {
        inicializeApp() 
    }, [])


    return (
        <appContext.Provider value={{
            singIn,
            checkLogin,
            user,
            isAutenticate,
            loading,
            authLoading,
            createUser,
            buttonDisable,
            loginResponse,
            getUserList,
            userList,
            logout,
            deleteUser,
            listUserByFilter,
            getUserListByParams,
            isEnteprice,
            enterprise,
            isAdmin,
            getEnterprise,
            inicializeApp,
        }}>
            {children}
        </appContext.Provider>
    )
}
