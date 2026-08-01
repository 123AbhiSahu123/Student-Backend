import jwt from "jsonwebtoken";

const superAdminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "SUPER_ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        })
    }
}

export default superAdminAuth;