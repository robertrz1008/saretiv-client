import { useContext, createContext, type ReactNode, useState, useEffect } from "react";
import { type CreateUser, type LoginResponse, type Profile, type User, type UserLogin, } from "../Interface/InAuth";
import { loginRequest, profileRequest, registerRequest, usersListRequest } from "../services/Auth.service";
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
    const [isAutenticate, setIstAutenticate] = useState<boolean>(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const [loginResponse, setLoginResponse] = useState<LoginResponse>()
    const [userList, setUserList] = useState<User[]>([])

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
            setLoading(false)
            setUser(response.data)
            setIstAutenticate(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const createUser = async (user: CreateUser) => {
        try {
            await registerRequest(user)
            getUserList
        } catch (error) {
            console.log(error)
        }
    }
    async function getUserList(){
            try {
                const response= await usersListRequest()
                setUserList(response.data)
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
            createUser,
            buttonDisable,
            loginResponse,
            getUserList,
            userList
        }}>
                {children}
        </appContext.Provider>
    )
}
