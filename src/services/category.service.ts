import {HTTP } from "../utils/config"
import axios from "./axios";
import type {Category} from "../Interface/InApp"

const API = HTTP+"/api/categoryPro"

export const getCategoryProRequest = () => axios.get(API)
export const postCategoryProRequest = (cat: Category) => axios.post(API, cat)
export const deleteCategoryProRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateCategoryProRequest = (id: number, cat: Category) => axios.put(API+`/${id}`, cat) 