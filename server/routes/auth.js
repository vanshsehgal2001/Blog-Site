const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

//GET THE LOGGED IN USER
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//LOGIN THE USER
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required!!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      var user = await User.findOne({
        email,
      });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password Incorrect" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) {
            throw error;
          }
          res.send(token);
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
