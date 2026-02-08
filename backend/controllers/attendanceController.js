const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// ✅ CREATE ATTENDANCE
exports.addAttendance = async (req, res) => {
    try {
        const { employeeId, status } = req.body;

        // 1️⃣ Validation: employeeId required
        if (!employeeId) {
            return res.status(400).json({
                message: "employeeId is required",
            });
        }

        // 2️⃣ Validation: status required & valid
        if (!status || !["Present", "Absent"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Present or Absent",
            });
        }

        // 3️⃣ Check employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        // 4️⃣ Create attendance
        const attendance = await Attendance.create({
            employee: employeeId,
            status,
        });

        return res.status(201).json(attendance);
    } catch (error) {
        console.error("Add Attendance Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// ✅ GET ATTENDANCE
exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate("employee", "name email department")
            .sort({ createdAt: -1 });

        return res.status(200).json(records);
    } catch (error) {
        console.error("Get Attendance Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
