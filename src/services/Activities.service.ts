import axios from "./axios";
import { HTTP } from "../utils/config";
import type { ActivityDTO } from "../Interface/Activities";

const API = HTTP+"/api/supportActivity"

export const getActivitiesRequest = () => axios.get(API)

export const getActivitiesBySupportIdRequest = (supportId: number) => axios.get(API+`/support/${supportId}`)

export const postActivitiesRequest = (act: ActivityDTO[]) => axios.post(API, act)

export const deleteActivityRequest  =(id: number) => axios.delete(API+`/${id}`)