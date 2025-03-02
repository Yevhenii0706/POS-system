import axios from 'axios'

const httpRequest = axios.create({
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    baseURL: "https://inventory-r06h.onrender.com/api",
    withCredentials: true,
})

export default httpRequest