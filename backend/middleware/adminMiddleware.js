// middleware/adminMiddleware.js
export default function isAdmin(req, res, next) {
  if (req.user && req.user.userType === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}
