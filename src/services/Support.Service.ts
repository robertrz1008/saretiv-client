import axios from "./axios";
import { HTTP } from "../utils/config";
import type { SupportParams, SupportPost } from "../Interface/SupportIn";

const API = HTTP+"/api/support"

export const getSupportsRequest = () => axios.get(API)

export const getSupportsCustomRequest = () => axios.get(API+"/custom")

export const getSupportsCustomByIdRequest = (id: number) => axios.get(API+"/custom/"+id)

export const getSupportByParamsRequest = (params: SupportParams) => axios.post(API+"/params", params)

export const postSupportRequest = (sup: SupportPost) => axios.post(API, sup)

export const getSupportFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)

export const deleteSupportRequest = (id: number) => axios.delete(API+`/${id}`)

export const updateSupportRequest = (id: number, sup: SupportPost) => axios.put(API+`/${id}`, sup) 

export const updateSupportTotalRequest = (id: number, total: number) => axios.put(API+`/total/${total}/${id}`) 

export const updateSupportStatusRequest = (id: number, status: string) => axios.put(API+`/status/${status}/${id}`) 

export const getSupportByIdRequest = (id: number) => axios.get(API+`/id/${id}`)
