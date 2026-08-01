import {
    loginService,
    getAllStudentsService
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
// Get All Students
// =======================

export const getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudentsService();
        res.status(200).json({
            success: true,
            totalStudents: students.length
            ,
            students,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =======================
// Get Student By Id
// =======================

// export const getStudentById = async (req, res) => {

//     try {

//         const student = await getStudentByIdService(req.params.id);

//         res.status(200).json({
//             success: true,
//             student,
//         });

//     } catch (error) {

//         res.status(404).json({
//             success: false,
//             message: error.message,
//         });

//     }

// };




// =======================
// Delete Student
// =======================

// export const deleteStudent = async (req, res) => {

//     try {

//         const result = await deleteStudentService(req.params.id);

//         res.status(200).json(result);

//     } catch (error) {

//         res.status(404).json({
//             success: false,
//             message: error.message,
//         });

//     }

// };
