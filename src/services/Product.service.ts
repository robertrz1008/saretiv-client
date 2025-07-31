import axios from "./axios";
import type {Category, ProductPost} from "../Interface/InApp"
import { HTTP } from "../utils/config";

const API = HTTP+"/api/product"

export const getProductRequest = () => axios.get(API)
export const postProductRequest = (cat: ProductPost) => axios.post(API, cat)
export const getProductByFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)
export const deleteProductRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateProductRequest = (id: number, cat: ProductPost) => axios.put(API+`/${id}`, cat) 
export const getProductByIdRequest = (id: number) => axios.get(API+`/id/${id}`)