import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
            <Link to="/">Employees</Link> |{" "}
            <Link to="/attendance">Attendance</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    );
}

export default Navbar;
