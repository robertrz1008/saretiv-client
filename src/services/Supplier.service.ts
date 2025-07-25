import {HTTP } from "../utils/config"
import axios from "./axios";
import type {Supplier} from "../Interface/InApp"

const API = HTTP+"/api/supplier"

export const getSupplierRequest = () => axios.get(API)
export const getSupplierByFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)
export const postSupplierProRequest = (cat: Supplier) => axios.post(API, cat)
export const deletesupplierRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateSupplierRequest = (id: number, cat: Supplier) => axios.put(API+`/${id}`, cat) 