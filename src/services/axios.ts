import axios from "axios"

const http = "http://localhost:8080/"
 
const instance = axios.create({
    baseURL: http,
    withCredentials: true
})

export default instance