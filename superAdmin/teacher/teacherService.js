import bcrypt from "bcryptjs";
import Teacher from "../../models/teacherModel.js";

export const registerTeacherService = async (teacherData) => {
    const {
        name,
        email,
        phone,
        password,
        subject,
        qualification,
        experience,
    } = teacherData;

    const existingTeacher = await Teacher.findOne({
        where: { email },
    });
    if (existingTeacher) {
        throw new Error("Teacher Already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
        name,
        email,
        phone,
        password: hashPassword,
        subject,
        qualification,
        experience,
    });
    return {
        success: true,
        message: "Teacher registered successfully",

        teacher: {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
            subject: teacher.subject,
            qualification: teacher.qualification,
            experience: teacher.experience,
        },
    };
};

export const getAllTeachersService = async () => {
    const teachers = await Teacher.findAll({
        attributes: {
            exclude: ["password"],
        },
        order: [["createdAt", "DESC"]],
    });
    return {
        success: true,
        totalTeachers: teachers.length,
        teachers,
    };
};