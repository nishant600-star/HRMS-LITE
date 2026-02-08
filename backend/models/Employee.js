const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: [true, "Employee ID is required"],
            unique: true,
            trim: true,
            immutable: true, // cannot be changed once created
            minlength: [3, "Employee ID must be at least 3 characters"],
        },

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please use a valid email address",
            ],
        },

        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true,
            enum: {
                values: ["HR", "Engineering", "Sales", "Marketing", "Finance"],
                message: "Invalid department",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
