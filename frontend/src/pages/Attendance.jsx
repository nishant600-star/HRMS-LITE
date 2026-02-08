import { useEffect, useState } from "react";
import axios from "axios";

const EMP_API = "http://localhost:5000/api/employees";
const ATT_API = "http://localhost:5000/api/attendance";

export default function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [status, setStatus] = useState("Present");
    const [filterDate, setFilterDate] = useState("");

    // Load employees
    const loadEmployees = async () => {
        try {
            const res = await axios.get(EMP_API);
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to load employees");
        }
    };

    // Load attendance
    const loadAttendance = async () => {
        try {
            const res = await axios.get(ATT_API);
            setRecords(res.data);
        } catch (err) {
            console.error("Failed to load attendance");
        }
    };

    useEffect(() => {
        loadEmployees();
        loadAttendance();
    }, []);

    // Add attendance
    const handleAdd = async () => {
        if (!employeeId) {
            alert("Please select an employee");
            return;
        }

        try {
            await axios.post(ATT_API, {
                employeeId,
                status,
            });

            setEmployeeId("");
            setStatus("Present");
            loadAttendance();
        } catch (err) {
            alert("Failed to add attendance");
        }
    };

    return (
        <div>
            <h1>Attendance Page</h1>

            {/* Controls */}
            <div style={{ marginBottom: "10px" }}>
                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                            {emp.name} ({emp.department})
                        </option>
                    ))}
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ marginLeft: "8px" }}
                >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>

                <button onClick={handleAdd} style={{ marginLeft: "8px" }}>
                    Add Attendance
                </button>
            </div>

            {/* Date Filter */}
            <div style={{ marginBottom: "10px" }}>
                <label>Filter by Date: </label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            <hr />

            {/* Attendance List */}
            {records.length === 0 ? (
                <p>No attendance records found.</p>
            ) : (
                <ul>
                    {records
                        .filter((a) => {
                            if (!filterDate) return true;
                            return a.createdAt?.slice(0, 10) === filterDate;
                        })
                        .map((a) => (
                            <li key={a._id}>
                                <b>{a.employee?.name || "Unknown"}</b>{" "}
                                ({a.employee?.department || "N/A"})
                                <br />
                                Status: {a.status}
                                <br />
                                Date: {new Date(a.createdAt).toLocaleString()}
                                <hr />
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
