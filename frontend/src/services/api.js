import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const getAttendance = () => API.get("/attendance");
export const addAttendance = (data) => API.post("/attendance", data);

export const getDashboard = () => API.get("/dashboard");
