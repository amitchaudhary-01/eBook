import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Get token from cookies or authorization headers
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach user ID to the request object so controllers can use it
        req.userId = decoded.id; 

        next(); // Move to the controller
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};