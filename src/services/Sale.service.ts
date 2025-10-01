import axios from "./axios";
import { HTTP } from "../utils/config";
import type { ProductDetailPost, Sale, SaleDates, SaleParams } from "../Interface/SalesInterfaces"

const API = HTTP+"/api/sale"

export const getProductDetailBySupportRequest= (id: number) => axios.get(API+`/proDetail/support/${id}`)

export const getProductDetailByIdRequest = (id: number) => axios.get(API+`/proDetail/${id}`)

export const deleteProductDetailRequest = (id: number) => axios.delete(API+`/proDetail/${id}`)

export const createProDetailRequest = (pro: ProductDetailPost[]) => axios.post(API+"/proDetail", pro)

export const createSaleRequest = (sale: Sale) => axios.post(API, sale)

export const updateSaleRequest = (id: number, sale: {total: number}) => axios.put(API+`/${id}`, sale)

export const getSaleByDatesRequest = (sale: SaleDates) => axios.post(API+"/data", sale)

export const getSalesByParamsRequest = (params: SaleParams) => axios.post(API+"/params", params)