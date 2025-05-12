const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username }; // Add username to req.user

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
console.log(process.env.JWT_SECRET);
module.exports = auth;