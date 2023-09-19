const jwt = require('jsonwebtoken');
const secretKey = 'P5j^2b4L$ZuV7#s@G!9wQ'; // Replace with your actual secret key

// Middleware to check JWT token
function authenticateToken(req, res, next) {
  // Get the token from the request headers or other sources
  const token = req.header('Authorization');
    console.log(req, token);
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
    }

    // If the token is valid, you can access the decoded data
    // For example, you can access the username like this:
    // const username = decoded.username;

    // You can also attach the decoded data to the request object for later use
    req.user = decoded;

    // Continue processing the request
    next();
  });
}

module.exports = authenticateToken;