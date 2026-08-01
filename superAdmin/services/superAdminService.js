import jwt from "jsonwebtoken";
import { User, Data } from "../../models/stumodels.js";
import superAdminConfig from "../../config/superAdminConfig.js";


// =======================
// Super Admin Login
// =======================

export const loginService = async (email, password) => {

    if (
        email !== superAdminConfig.email ||
        password !== superAdminConfig.password
    ) {
        throw new Error("Invalid Email or Password");
    }

    const token = jwt.sign(
        {
            role: "SUPER_ADMIN",
            email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return {
        success: true,
        message: "Login Successfully",
        token,
    };
};



// =======================
// Get All Students
// =======================

export const getAllStudentsService = async () => {

    const students = await User.findAll({

        attributes: {
            exclude: ["password"],
        },

        include: [
            {
                model: Data,
                as: "studentData",
            },
        ],

        order: [["createdAt", "DESC"]],
    });

    return students;
};




// =======================
// Get Student By Id
// =======================

// export const getStudentByIdService = async (id) => {

//     const student = await User.findByPk(id, {

//         attributes: {
//             exclude: ["password"],
//         },

//         include: [
//             {
//                 model: Data,
//                 as: "studentData",
//             },
//         ],
//     });

//     if (!student) {
//         throw new Error("Student Not Found");
//     }

//     return student;
// };




// =======================
// Delete Student
// =======================

// export const deleteStudentService = async (id) => {

//     const student = await User.findByPk(id);

//     if (!student) {
//         throw new Error("Student Not Found");
//     }

//     await Data.destroy({
//         where: {
//             UserId: id,
//         },
//     });

//     await User.destroy({
//         where: {
//             id,
//         },
//     });

//     return {
//         success: true,
//         message: "Student Deleted Successfully",
//     };
// };