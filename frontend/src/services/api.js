import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-customer-complaint-management-system-2f7q.onrender.com",
});

export default api;