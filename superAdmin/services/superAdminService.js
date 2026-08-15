import jwt from "jsonwebtoken";
import { User, Data } from "../../models/stumodels.js";
import superAdminConfig from "../../config/superAdminConfig.js";
import sequelize from "../../config/db.js";


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
// Delete Student
// =======================

export const deleteStudentService = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const student = await User.findByPk(id, {
            attributes: ["id", "name", "email"],
            include: [
                {
                    model: Data,
                    as: "studentData",
                    attributes: ["course", "phone", "age", "location"],
                },
            ],
            transaction,
        })
        if (!student) {
            await transaction.rollback();
            throw new Error("Student Not Found");
        }
        // Delete student profile/data first
        await Data.destroy({
            where: {
                UserId: id,
            },
            transaction,
        });

        // Delete user
        await User.destroy({
            where: {
                id,
            },
            transaction,
        });

        // Everything successful
        await transaction.commit();
        // Convert Sequelize object to normal JSON
        const deletedStudent = student.toJSON();

        return {
            success: true,
            message: "Student Deleted Successfully",
            deletedStudent: deletedStudent,
        };

    } catch (error) {
        // If anything fails, undo all changes
        await transaction.rollback();
        throw error;
    }
};