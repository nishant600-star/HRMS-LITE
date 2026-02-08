# HRMS-LITE
HRMS Lite – Employee &amp; Attendance Management System

# HRMS-LITE (Human Resource Management System)

HRMS-LITE is a lightweight full-stack Human Resource Management System built as part of an industry-style assignment.  
It allows a single admin to manage employees, track attendance, and view basic dashboard statistics.

The project focuses on clean architecture, RESTful APIs, and a usable UI rather than over-engineering.

---

## Features

###  Employee Management
- Add employee with:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View employee list
- Delete employee
- Duplicate employee protection

###  Attendance Management
- Mark attendance (Present / Absent)
- Select employee before marking attendance
- Attendance records linked to employees
- Filter attendance by date

###  Dashboard
- Total employees count
- Total attendance records count
- Automatically updates when data changes

---

##  Tech Stack

### Frontend
- React
- React Router
- Axios
- Plain CSS (no UI framework, clean & minimal)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Database
- MongoDB Atlas (Cloud NoSQL database)

---

## Project Structure

