import axios from "axios";

// http://localhost:5000
// /api/users  GET POST PUT DELETE
// /api/auth  POST

const uri = "http://localhost:5000";

const api = axios.create({baseURL: uri});

export default api;
