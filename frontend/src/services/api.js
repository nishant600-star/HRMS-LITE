import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const getAttendance = () => API.get("/attendance");
export const addAttendance = (data) => API.post("/attendance", data);

export const getDashboard = () => API.get("/dashboard");
