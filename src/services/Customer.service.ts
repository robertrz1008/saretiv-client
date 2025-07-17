import axios from "./axios";
import { HTTP } from "../utils/config";
import type { Customer } from "../Interface/InApp";

const API = HTTP+"/api/customer"

export const customerListRequest = () => axios.get(HTTP+"/api/customer")
export const createCustomertRequest = (cus: Customer) => axios.post(API, cus)
export const updateCustomerRequest = (doc: string, cus: Customer) => axios.put(API+`/${doc}`, cus)
export const deleteCustomerRequest = (id: number) => axios.delete(API+`/${id}`)
export const getCustomerByFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)