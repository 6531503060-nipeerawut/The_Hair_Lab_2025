import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ← ชี้ไปที่ Node.js backend
});

// ตัวอย่างเรียกใช้:
// await api.get("/bookings");
// await api.post("/users/login", { email, password });
export default api;
