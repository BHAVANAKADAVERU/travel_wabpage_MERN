import jwt from 'jsonwebtoken';

// Verify token from cookies
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;  // Read token from cookies

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token not found. Please log in again."
    });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again."
      });
    }
    req.user = user;  // Attach user info to the request object
    next();  // Proceed to next middleware or route handler
  });
};

// Verify user authorization (to ensure the logged-in user can access their data)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.body.userID || req.user.role === 'admin') {
      next();  // Proceed if the user ID matches or the user is an admin
    } else {
      res.status(401).json({
        success: false,
        message: "You're not authorized to access this resource"
      });
    }
  });
};

// Verify admin authorization (only admins can access certain routes)
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'admin') {
      next();  // Proceed if the user is an admin
    } else {
      res.status(401).json({
        success: false,
        message: "You're not authorized to access this resource"
      });
    }
  });
};
