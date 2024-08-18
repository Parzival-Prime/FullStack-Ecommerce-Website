import axios from "axios";

// Creating axios Instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
  });
  
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.common["Accept"] = "application/json";
  
  export { axiosInstance };
  