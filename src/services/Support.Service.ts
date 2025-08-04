import axios from "./axios";
import { HTTP } from "../utils/config";
import type { SupportTypeDTO } from "../Interface/SupportIn";

const API = HTTP+"/api/typeSupport"

export const getSupportsRequest = () => axios.get(API)
export const postSupportRequest = (sup: SupportTypeDTO) => axios.post(API, sup)
export const getSupportFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)
export const deleteSupportRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateSupportRequest = (id: number, sup: SupportTypeDTO) => axios.put(API+`/${id}`, sup) 
export const getSupportByIdRequest = (id: number) => axios.get(API+`/id/${id}`)