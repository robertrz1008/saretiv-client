import { useContext, createContext, type ReactNode, useState, useEffect } from "react";
import { type CreateUser, type LoginResponse, type Profile, type UserLogin, type UserView } from "../Interface/InAuth";
import { getUsersRequest, loginRequest, profileRequest, registerRequest } from "../services/Auth.service";
import type { AxiosResponse, AxiosError} from "axios";

const appContext = createContext({})

export const useAuth = () => {
    const context = useContext(appContext)
    if(!context){
        throw new Error("Context invalid")
    }
    return context
}

interface ContexArg{
    children: ReactNode
}

export const AuthContextProvider = ({children}: ContexArg) => {    

    const [user, setUser] = useState<Profile>()
    const [users, setUsers] = useState<UserView[]>([])
    const [isAutenticate, setIstAutenticate] = useState<boolean>(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const [loginResponse, setLoginResponse] = useState<LoginResponse>()


    const singIn = async (user: UserLogin) => {
        setAuthLoading(true)
        //buttonDisable
        setButtonDisable(true)
        
        try {
           const response:AxiosResponse<LoginResponse>  = await loginRequest(user)
            // setAuthLoading(false)
            console.log("response", response.data)
            checkLogin()
            
            //buttonEnable
            setIstAutenticate(true)
            setButtonDisable(false)

            if(!response.data.status){
                setAuthLoading(false)
                setButtonDisable(false)
                setLoginResponse(response.data)
                return
            }

        } catch (error: AxiosError<LoginResponse> | any) {
                setLoginResponse(error.response?.data)
                setAuthLoading(false)
                setButtonDisable(false)
                // etErrors(error.response?.data)
        }
    }

    const checkLogin = async () => {
        setLoading(true)
        //console.log("cookie", cookies)
        // if(!cookies){
        //     setIstAutenticate(false)
        //     setLoading(false)
        //     console.log("NO hay token")
        // }
        try {
            const response = await profileRequest()
            if(!response.data){
                setIstAutenticate(false)
                setLoading(false)
                return
            }
            usersList()
            setLoading(false)
            setUser(response.data)
            setIstAutenticate(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const usersList = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async (user: CreateUser) => {
        try {
            await registerRequest(user)
            usersList()
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        checkLogin()
    }, [])
    useEffect(() => {
        console.log(user)
    }, [user])
    

    return(
        <appContext.Provider value={{
            singIn,
            checkLogin,
            user,
            isAutenticate,
            loading,
            authLoading,
            users,
            createUser,
            usersList,
            buttonDisable,
            loginResponse
        }}>
                {children}
        </appContext.Provider>
    )
}
