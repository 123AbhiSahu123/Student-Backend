import jwt from "jsonwebtoken";
import { Op } from "sequelize";
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

export const getAllStudentsService = async ({
    page = 1,
    limit = 10,
    search = "",
    fromDate = "",
    toDate = ""
}) => {

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;
    const where = {};

    //SEARCH
    if (search.trim()) {
        where[Op.or] = [
            {
                name: {
                    [Op.iLike]: `%${search}%`,
                },
            },
            {
                email: {
                    [Op.iLike]: `%${search}%`,
                },
            },
            {
                "$studentData.phone$": {
                    [Op.iLike]: `%${search}%`,
                },
            },
            {
                "$studentData.course$": {
                    [Op.iLike]: `%${search}%`,
                },
            },
            {
                "$studentData.location$": {
                    [Op.iLike]: `%${search}%`,
                },
            },
        ];
    }

    // DATE FILTER
    if (fromDate || toDate) {

        where.createdAt = {};

        if (fromDate) {
            where.createdAt[Op.gte] = new Date(
                `${fromDate}T00:00:00.000Z`
            );
        }

        if (toDate) {
            const nextDay = new Date(
                `${toDate}T00:00:00.000Z`
            );

            nextDay.setUTCDate(nextDay.getUTCDate() + 1);

            where.createdAt[Op.lt] = nextDay;
        }
    }

    // FETCH

    const { count, rows } = await User.findAndCountAll({
        where,
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

        limit,
        offset,
        distinct: true,
    });

    // TOTAL DATABASE STUDENTS
    const totalStudents = await User.count();

    // TOTAL FILTERED PAGES
    const totalPages = Math.ceil(count / limit);

    return {
        success: true,
        totalStudents,
        totalFilteredStudents: count,
        current: page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        students: rows,
    };
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