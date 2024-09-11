import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://socialmedia-production-81c5.up.railway.app/api/",
});

