import axios from "axios"

const http = "http://localhost:4040/api/"

const instance = axios.create({
    baseURL: http,
    withCredentials: false
})

export default instance