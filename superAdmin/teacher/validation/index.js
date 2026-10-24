import { teacherRegisterSchema } from "./schemas.js";
import { z } from "zod";

export const validateTeacherRegister = (req, res, next) => {
    try {
        const result = teacherRegisterSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: z.flattenError(result.error).fieldErrors,
            });
        }
        req.body = result.data;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid request data",
        });
    }
}