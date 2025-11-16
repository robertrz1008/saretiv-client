import {HTTP } from "../utils/config"
import axios from "./axios";
import type {Category} from "../Interface/InApp"

const API = HTTP+"/api/categoryPro"
const API_DEV = HTTP+"/api/catDevice"
//product
export const getCategoryProRequest = () => axios.get(API)
export const postCategoryProRequest = (cat: Category) => axios.post(API, cat)
export const deleteCategoryProRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateCategoryProRequest = (id: number, cat: Category) => axios.put(API+`/${id}`, cat) 

//device
export const getCategoryDevRequest = () => axios.get(API_DEV)
export const postCategoryDevRequest = (cat: Category) => axios.post(API_DEV, cat)
export const deleteCategoryDevRequest = (id: number) => axios.delete(API_DEV+`/${id}`)
export const updateCategoryDevRequest = (id: number, cat: Category) => axios.put(API_DEV+`/${id}`, cat) 