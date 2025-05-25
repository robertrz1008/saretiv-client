import axios from "./axios";
import { type CreateUser, type Role, type UserLogin } from "../Interface/InAuth"
import {HTTP } from "../utils/config"

const httpAuth = HTTP+"/auth"

export const loginRequest = (user: UserLogin) => axios.post(httpAuth+"/logIn", user)
export const registerRequest = (user: CreateUser) => axios.post(httpAuth+"/sigIn", user)
export const profileRequest = () => axios.get(httpAuth+"/profile" )
export const getUsersRequest = () => axios.get(httpAuth+"/users" )

export const createRoleRequest = (role: Role) => axios.post(httpAuth+"/createRole", role)
    
