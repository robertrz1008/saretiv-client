import axios from "./axios";
import { HTTP } from "../utils/config";
import type { SupportTypeDTO, SupportTypeParams } from "../Interface/SupportIn";

const API = HTTP+"/api/typeSupport"

export const getSupportTypeRequest = () => axios.get(API)
export const postSupportTypeRequest = (sup: SupportTypeDTO) => axios.post(API, sup)
export const getSupportTypeFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)
export const deleteSupportTypeRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateSupportTypeRequest = (id: number, sup: SupportTypeDTO) => axios.put(API+`/${id}`, sup) 
export const getSupportTypeByIdRequest = (id: number) => axios.get(API+`/id/${id}`)
export const getSupportTypeByParamRequest = (params: SupportTypeParams) => axios.post(API+"/params", params)