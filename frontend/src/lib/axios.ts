import axios from "axios";

console.log("Axios instance created with base URL:", process.env.BACKEND_URL);

export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});
