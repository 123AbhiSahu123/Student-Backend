import {z} from "zod";

export const teacherRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z.string().min(2, "Password must be at least 6 characters"),
    subject: z.string().min(2, "Subject is required"),
    qualification: z.string().optional(),
    experience: z.string().optional(),
}); 