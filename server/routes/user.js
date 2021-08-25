const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

//REGISTER A USER
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter a password with more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    var user = await User.findOne({
      email,
    });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already registered" }] });
    }
    try {
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 3399999,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send(token);
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
