import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axiosReq.defaults.xsrfCookieName = 'csrftoken';
axiosReq.defaults.xsrfHeaderName = 'X-CSRFToken';
axiosRes.defaults.xsrfCookieName = 'csrftoken';
axiosRes.defaults.xsrfHeaderName = 'X-CSRFToken';
