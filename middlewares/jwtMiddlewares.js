const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Correctly extract token
  if (!token) {
      console.log("No token Provided");
      return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
      const verified = jwt.verify(token, process.env.JWTPASSWORD);
      console.log('Decoded Token:', verified); // Log the token payload
      req.user = verified.userId; // Set userId in the request object
      next();
  } catch (err) {
      console.error('Invalid Token:', err);
      res.status(400).json({ error: 'Invalid Token' });
  }
};



module.exports = authenticate;
