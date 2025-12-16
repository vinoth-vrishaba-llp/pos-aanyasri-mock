import axios from "axios";

// Since we are using mock data, this axios instance is largely unused 
// but kept for compatibility if any components still import 'api'.
const api = axios.create({
  baseURL: "/", // No backend, just relative path
});

export default api;
