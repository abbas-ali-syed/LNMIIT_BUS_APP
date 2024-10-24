import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, auth denied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Check if the decoded token has a 'user' property
      if (decoded.user) {
        req.user = decoded.user;
      } else {
        // If not, assume the decoded token itself contains user info
        req.user = decoded;
      }

      // Ensure username is set
      if (!req.user.username) {
        console.error('Username not found in decoded token');
        return res.status(401).json({ message: "Invalid token structure" });
      }

      console.log("The decoded user is: ", req.user);
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ message: "Token invalid" });
    }
  } else {
    res.status(401).json({ message: "No token, auth denied" });
  }
};

export default verifyToken;
