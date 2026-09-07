import {
    loginService,
    getAllStudentsService,
    deleteStudentService,
} from "../services/superAdminService.js";


// =======================
// Super Admin Login
// =======================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }
        const result = await loginService(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });

    }
}

// =======================
// Super Admin Logout
// =======================
export const logout = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Super Admin logout sucessfull"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};


// =======================
// Get All Students
// =======================

export const getAllStudents = async (req, res) => {
    try {
        const {
            page,
            limit,
            search,
            fromDate,
            toDate,
        } = req.query;
        const result = await getAllStudentsService({
            page,
            limit,
            search,
            fromDate,
            toDate,
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Get Students Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =======================
// Delete Student
// =======================

export const deleteStudent = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await deleteStudentService(id);
        return res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
