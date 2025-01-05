import jwt from "jsonwebtoken";

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // First check for token in cookies
  const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, msg: "Access denied. You're not authorized." });
  }

  // If token exists, verify it
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, msg: "Token is invalid." });
    }
    req.user = user;  // Attach user information to request object
    next();  // Proceed to the next middleware or route handler
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // Check if the logged-in user matches the requested user ID or if the user is an admin
    if (req.user.id === req.body.userID || req.user.role === "admin") {
      next();  // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ success: false, msg: "You're not authorized to access this resource." });
    }
  });
};

// Middleware to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();  // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ success: false, msg: "You're not authorized. Admin privileges are required." });
    }
  });
};
