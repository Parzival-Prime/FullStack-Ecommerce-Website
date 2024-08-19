import axios from "axios";

// Creating axios Instance
const axiosInstance = axios.create({
    baseURL: "https://walrus-app-8crlr.ondigitalocean.app/",
    withCredentials: true
  });
  
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.common["Accept"] = "application/json";
  
  export { axiosInstance };
  