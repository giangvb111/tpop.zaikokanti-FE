import axios from "axios";
// import { getCookie } from "cookies-next";
 
const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
 
// Request interceptor
axiosAPI.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    // const accessToken = getCookie("access_token");
 
    // If token is present add it to request's Authorization Header
    // if (accessToken) {
    //   if (config.headers) config.headers.Authorization = accessToken;
    // }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
 
// Response interceptor
axiosAPI.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);
 
export default axiosAPI;