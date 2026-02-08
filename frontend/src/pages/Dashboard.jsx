import { useEffect, useState } from "react";
import axios from "axios";

const EMP_API = "http://localhost:5000/api/employees";
const ATT_API = "http://localhost:5000/api/attendance";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const [empRes, attRes] = await Promise.all([
                axios.get(EMP_API),
                axios.get(ATT_API),
            ]);

            setEmployees(empRes.data);
            setAttendance(attRes.data);
            setError("");
        } catch (err) {
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {employees.length === 0 ? (
                <p>No employees added yet.</p>
            ) : (
                <div className="dashboard-cards">
                    <div className="card">
                        <h3>Total Employees</h3>
                        <p>{employees.length}</p>
                    </div>

                    <div className="card">
                        <h3>Total Attendance Records</h3>
                        <p>{attendance.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
