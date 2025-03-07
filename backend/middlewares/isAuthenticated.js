import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        req.user = decode; // Pass decoded user information for further use
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default isAuthenticated;
