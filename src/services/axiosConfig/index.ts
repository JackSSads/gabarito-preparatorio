import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const API = axios.create({
    baseURL: URL_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use(
    (response) => response,
    (error) => { 
        if (error.response?.status === 401) {
            window.location.href = "/login";
            localStorage.removeItem("token");
        };
        return Promise.reject(error);
    });

export { API };
