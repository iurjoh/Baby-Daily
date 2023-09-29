import axios from "axios";

// axios.defaults.baseURL = "https://iurjoh-baby-daily-backend-api-1674476236b8.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
