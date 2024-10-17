import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
    config.headers.Accept = import.meta.env.VITE_CLIENT_URL;
    config.headers['Access-Control-Allow-Origin'] = import.meta.env.VITE_CLIENT_URL;;
    config.headers["Content-Type"] = 'application/json';
return config;
})

export default api;