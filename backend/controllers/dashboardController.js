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

        res.status(200).json({
            totalEmployees,
            totalAttendance,
            presentCount,
            absentCount,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to load dashboard data",
        });
    }
};
