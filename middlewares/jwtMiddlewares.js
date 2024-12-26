const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT for protected routes
 * Ensures the token is valid and extracts user ID to attach to the request object
 */
const verifyJwtForBooking = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Get the Authorization header

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1]; // Split on space and take the second part
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
    const secretKey = process.env.JWTPASSWORD; // Load secret key from environment variables
    const decoded = jwt.verify(token, secretKey); // Verify and decode the token

    req.userId = decoded.id; // Attach the user ID to the request object for downstream use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyJwtForBooking;
