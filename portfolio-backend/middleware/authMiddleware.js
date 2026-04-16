const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    
    // Check if token exists
    if (!authHeader) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access denied. No token provided.' 
        });
    }
    
    // Extract token (remove "Bearer " prefix)
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user data to request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid token.' 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                success: false, 
                message: 'Token expired. Please login again.' 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            message: 'Authentication error.' 
        });
    }
};

module.exports = authMiddleware;