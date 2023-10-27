import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.173.174:8000/api",
  withCredentials: true,
});
