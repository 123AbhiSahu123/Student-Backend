import express from "express";
import { validateTeacherRegister} from "./validation/index.js";
import {
    registerTeacher,
    getAllTeacher,
} from "./teacherController.js";
import superAdminAuth from "../../middleware/superAdminAuth.js";

const router = express.Router();

// Teacher Register
router.post(
    "/register",
    validateTeacherRegister,
    superAdminAuth,
    registerTeacher
);

// Teachers List
router.get(
    "/",
    superAdminAuth,
    getAllTeacher
)

export default router;