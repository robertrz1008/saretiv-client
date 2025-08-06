import {HTTP } from "../utils/config"
import axios from "./axios";
import type { DevicePost } from "../Interface/SupportIn";

const API = HTTP+"/api/device"

export const getDeviceRequest = () => axios.get(API)
export const getDeviceByFilterRequest = (filter: string) => axios.get(API+`/filter/${filter}`)
export const postDeviceRequest = (dev: DevicePost) => axios.post(API, dev)
export const deleteDeviceRequest = (id: number) => axios.delete(API+`/${id}`)
export const updateDeviceRequest = (id: number, dev: DevicePost) => axios.put(API+`/${id}`, dev) 