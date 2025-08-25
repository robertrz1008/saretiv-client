import axios from "./axios";
import { HTTP } from "../utils/config";
import type { ProductDetailPost, Sale } from "../Interface/SalesInterfaces"

const API = HTTP+"/api/supportActivity"

const getActivitiesRequest = () => axios.get(API)
