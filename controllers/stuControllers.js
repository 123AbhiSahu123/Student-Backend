import {
    registerUserService,
    loginUserService,
    registerDataService,
    getProfileService,
} from "../services/stuServices.js";

// Register User
export const registerUser = async (req, res) => {
    try {
        const result = await registerUserService(req.body);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const result = await loginUserService(req.body);

        const cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
        };

        return res
            .status(200)
            .cookie("token", result.token, cookieOptions)
            .json(result);
    } catch (err) {
        const status =
            err.message === "User don't find!"
                ? 404
                : err.message === "Wrong password!"
                    ? 400
                    : 500;

        return res.status(status).json({
            error: err.message,
        });
    }
};

// Register Data
export const registerData = async (req, res) => {
    try {
        const result = await registerDataService(
            req.body,
            req.user.id
        );

        return res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            details: err.errors?.map((e) => e.message),
        });
    }
};

// Get Profile
export const getProfile = async (req, res) => {

    try {
        console.log(req.user); // { id: 1, ... }
        const user = await getProfileService(req.user.id);

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
                error: err.message,
            });
    }
};


