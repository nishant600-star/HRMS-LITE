const express = require("express");
const router = express.Router();

const {
    addAttendance,
    getAttendance,
} = require("../controllers/attendanceController");

router.post("/", addAttendance);
router.get("/", getAttendance);

module.exports = router;
