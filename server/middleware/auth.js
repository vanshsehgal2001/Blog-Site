const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

module.exports = auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Not token found! Authorization denied!!" });
  }
  try {
    const info = jwt.verify(token, jwtSecret);
    req.user = info.user;
    next();
  } catch (error) {
    return res.status(401).send("No valid token found!!!");
  }
};
