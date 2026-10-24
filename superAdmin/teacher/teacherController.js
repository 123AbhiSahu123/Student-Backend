import { registerTeacherService, getAllTeachersService, } from "./teacherService.js";

export const registerTeacher = async (req, res) => {
    try {
        const result = await registerTeacherService(req.body);
        return res.status(201).json(result);
    } catch (err) {
        console.error("Register Teacher Error:", err);
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllTeacher = async( req, res) => {
    try {
        const result = await getAllTeachersService();
        return res.status(200).json(result);
    } catch (err) {
        console.error("Get Teacher Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};