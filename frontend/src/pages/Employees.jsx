import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/employees";

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        employeeId: "",
        name: "",
        email: "",
        department: "",
    });

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API);
            setEmployees(res.data);
        } catch (err) {
            setError("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ UPDATED (SAFE & CLEAN)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post(API, {
                employeeId: form.employeeId,
                name: form.name,
                email: form.email,
                department: form.department,
            });

            setForm({
                employeeId: "",
                name: "",
                email: "",
                department: "",
            });

            loadEmployees();
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        loadEmployees();
    };

    return (
        <div>
            <h1>Employee Management</h1>

            {/* ADD EMPLOYEE */}
            <h3>Add Employee</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="employeeId"
                    placeholder="Employee ID"
                    value={form.employeeId}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Add Employee</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <hr />

            {/* EMPLOYEE LIST */}
            <h3>Employee List</h3>

            {loading && <p>Loading employees...</p>}
            {!loading && employees.length === 0 && (
                <p>No employees added yet.</p>
            )}

            <ul>
                {employees.map((e) => (
                    <li key={e._id}>
                        <b>{e.name}</b>
                        <br />
                        {e.email}
                        <br />
                        Department: {e.department}
                        <br />
                        <button onClick={() => handleDelete(e._id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

