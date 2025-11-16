import axios from "./axios";
import { HTTP } from "../utils/config";
import type { Enterprice } from "../Interface/InApp";

const API = HTTP+"/api/enterprise"

export const getEnterpriceRequest = () => axios.get(API)

export const postEnterpriceRequest = (enterprise: Enterprice) => axios.post(API, enterprise)

export const putEnterpriceRequest = (id: number, enterprise: Enterprice) => axios.put(API+`/${id}`, enterprise)

export const getRevenuesRequest = () => axios.get(API+"/revenues")