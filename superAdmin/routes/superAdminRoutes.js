import express from "express"; 
import {
    login,
    getAllStudents,
} from "../controllers/superAdminController.js";

import superAdminAuth from "../../middleware/superAdminAuth.js";

const router = express.Router();

// ==========================
// Login
// ==========================
router.post("/login", login);


// ==========================
// Get All Students
// ==========================
router.get("/students", superAdminAuth, getAllStudents);

// ==========================
// Get Student By Id
// ==========================
// router.get("/students/:id", superAdminAuth, getStudentById);


// ==========================
// Delete Student
// ==========================
// router.delete("/students/:id", superAdminAuth, deleteStudent);

export default router;