const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

exports.getDashboardSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalAttendance = await Attendance.countDocuments();

        const presentCount = await Attendance.countDocuments({
            status: "Present",
        });

        const absentCount = await Attendance.countDocuments({
            status: "Absent",
        });

        res.json({
            totalEmployees,
            totalAttendance,
            presentCount,
            absentCount,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Dashboard error" });
    }
};
