const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  // Check for authorization header in both lowercase and capitalized
  const token = req.headers['authorization'] || req.headers['Authorization'];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    // Verify the token using the correct secret
    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.log('JWT Error:', err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = ensureAuthenticated;
