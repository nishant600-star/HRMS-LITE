const Employee = require("../models/Employee");

// helper: email validation
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ➕ Add employee (REPLACED)
exports.addEmployee = async (req, res) => {
    try {
        const { employeeId, name, email, department } = req.body;

        // 1️⃣ Required field validation
        if (!employeeId || !name || !email || !department) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // 2️⃣ Email format validation
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        // 3️⃣ Duplicate employee check
        const existingEmployee = await Employee.findOne({
            $or: [{ employeeId }, { email }],
        });

        if (existingEmployee) {
            return res.status(409).json({
                message: "Employee with same ID or email already exists",
            });
        }

        // 4️⃣ Create employee
        const employee = await Employee.create({
            employeeId,
            name,
            email,
            department,
        });

        return res.status(201).json(employee);
    } catch (error) {
        console.error("Add Employee Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// 📄 Get all employees (UNCHANGED)
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch employees",
        });
    }
};

// ❌ Delete employee (UNCHANGED)
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Delete failed",
        });
    }
};
