// //verifyToken.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

// router.get('/verifyToken', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY_JWT, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }

//         // Token is valid, optionally return user data or simply a success message
//         // Assuming `decoded` contains the user ID (or other user-related information)
//         // You might want to fetch user details from your database here based on the decoded data

//         return res.json({
//             message: 'Token is valid',
//             // Optionally include user details or just a success message
//             // user: userData
//         });
//     });
// });

// module.exports = router;
