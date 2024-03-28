// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('No Authorization header');
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.userData = { userId: decodedToken.userId, role: decodedToken.role };
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
module.exports = authMiddleware;
