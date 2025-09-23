import axios from "./axios";
import { type CreateUser, type Role , type UserLogin, type UserParams } from "../Interface/InAuth"
import {HTTP } from "../utils/config"

const httpAuth = HTTP+"/auth"

export const loginRequest = (user: UserLogin) => axios.post(httpAuth+"/logIn", user)
export const registerRequest = (user: CreateUser) => axios.post(httpAuth+"/register", user)
export const profileRequest = () => axios.get(httpAuth+"/profile" )
export const logoutRequest = () => axios.post(httpAuth+"/logOut" )
export const updateUserRequest = (doc: string, user: CreateUser) => axios.put(httpAuth+`/updateUser/${doc}`, user)
export const deleteUserRequest = (id: number) => axios.delete(httpAuth+`/user/${id}`)
export const deleteUserRoleByUserRequest = (id: number) => axios.delete(httpAuth+`/userrole/${id}`)
export const getUserByFilterRequest = (filter: string) => axios.get(httpAuth+`/filter/${filter}`)

export const createRoleRequest = (role: Role) => axios.post(httpAuth+"/createRole", role)
export const usersListRequest = () => axios.get(httpAuth+"/users/list")
export const getUserByParamsRequest = (userParam: UserParams) => axios.post(httpAuth+"/params", userParam)

