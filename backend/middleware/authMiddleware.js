const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    
    // if no token found, return response (without going to the next middleware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        // if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, 'secret');
	console.log(decoded);
        req.userId = decoded.id;
        next();
    } catch (ex) {
        // if invalid token
        res.status(400).send("Invalid token.");
    }
};

module.exports = authMiddleware;
