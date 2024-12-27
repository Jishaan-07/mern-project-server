const jwt = require('jsonwebtoken');

 
const verifyJwtForBooking = (req, res, next) => {
  const authHeader = req.header('Authorization');  

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

   const token = authHeader.split(' ')[1];  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
    const secretKey = process.env.JWTPASSWORD;  
    const decoded = jwt.verify(token, secretKey);  n

    req.userId = decoded.id; 
    next();  
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyJwtForBooking;
