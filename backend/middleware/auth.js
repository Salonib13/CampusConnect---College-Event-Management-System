const jwt = require("jsonwebtoken");
const SECRET = "secretkey";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.send("Access Denied");

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.send("Invalid Token");
  }
}

module.exports = verifyToken;