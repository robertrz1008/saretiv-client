import axios from "./axios";
import { HTTP } from "../utils/config";
import type { ProductDetailPost, Sale } from "../Interface/SalesInterfaces"

const API = HTTP+"/api/sale"

export const getProductDetailRequest= () => axios.get(API)
export const createProDetailRequest = (pro: ProductDetailPost[]) => axios.post(API+"/proDetail", pro)
export const createSaleRequest = (sale: Sale) => axios.post(API, sale)
export const updateSaleRequest = (id: number, sale: {total: number}) => axios.put(API+`/${id}`, sale)