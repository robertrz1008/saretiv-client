import axios from "./axios";
import { HTTP } from "../utils/config";
import { PurchasePost, PurchaseProductPost } from "../Interface/purchase";

const API = HTTP+"/api/purchase"

export const getPurchaseProductRequequest = () => axios.get(API+"/detail/list")

export const getPurchaseProductByPurchaseRequequest = (id: number) => axios.get(API+"/detail/purchase/"+id)

export const createPurchaseProductRequequest = (pur: PurchaseProductPost[]) => axios.post(API+"/detail", pur)

export const updatePurchaseProductRequequest = (id: number, pur: PurchaseProductPost) => axios.put(API+`/detail/${id}`, pur)

export const deletePurchaseProductRequest = (id: number) => axios.delete(API+`/detail/${id}`)
export const deletePurchaseProductByPurchaseRequest = (id: number) => axios.delete(API+`/detail/purchase/${id}`)


export const getPurchasesRequequest = () => axios.get(API)

export const createPurchaseRequequest = (pur: PurchasePost) => axios.post(API, pur)

export const updatePurchaseRequequest = (id: number, pur: PurchasePost) => axios.put(API+`/${id}`, pur)

export const finishPurchaseRequequest = (id: number, pur: PurchasePost) => axios.put(API+`/status/${id}`, pur)

export const deletePurchaseRequest = (id: number) => axios.delete(API+`/${id}`)