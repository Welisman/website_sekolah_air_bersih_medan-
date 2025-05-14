const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isMasterAdmin = (req, res, next) => {
  if (req.user.role !== "master") {
    return res.status(403).json({ message: "Hanya master admin yang dapat melakukan tindakan ini" });
  }
  next();
};

module.exports = { verifyToken, isMasterAdmin };