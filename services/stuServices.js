import { User, Data } from "../models/stumodels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUserService = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        message: "User Created!",
        user: {
            name: user.name,
            email: user.email,
        },
    };
};

// Login User
export const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new Error("User don't find!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Wrong password!");
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,
        message: "Login Success",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
};

// Register Data
export const registerDataService = async (body, userId) => {
    const { course, phone, age, location } = body;

    const data = await Data.create({
        course,
        phone,
        age,
        location,
        UserId: userId,
    });

    return {
        message: "Data Created!",
        data,
    };
};

// Get Profile
export const getProfileService = async (userId) => {

    const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email"],
        include: [
            {
                model: Data,
                as: "studentData",
                attributes: ["course", "phone", "age", "location"],
            },
        ],
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};