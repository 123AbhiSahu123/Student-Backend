import express from "express"; 
import {
    login,
    getDashboardStats,
    getAllStudents,
    deleteStudent,
    logout,
} from "../controllers/superAdminController.js";

import superAdminAuth from "../../middleware/superAdminAuth.js";

const router = express.Router();

// ==========================
// Login
// ==========================
router.post("/login", login);

// ==========================
// Logout
// ==========================
router.post("/logout", superAdminAuth, logout);


// ==========================
//Dashboard
// ==========================
router.get(
    "/dashboard",
    superAdminAuth,
    getDashboardStats
);


// ==========================
// Get All Students
// ==========================
router.get("/students", superAdminAuth, getAllStudents);


// ==========================
// Delete Student
// ==========================
router.delete("/students/:id", superAdminAuth, deleteStudent);

export default router;