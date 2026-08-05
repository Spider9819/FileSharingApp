import axios from "axios";

const api = axios.create({
  baseURL: "https://filesharingappbackend-ppxx.onrender.com/api",
});

export default api;