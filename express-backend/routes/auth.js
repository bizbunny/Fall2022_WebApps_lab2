const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const saltRounds = 10;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCAOR8+HSoJZDCANwiszbZ0d5RdnV8OwAUl0c8YfiR435YQxNvf
s1IcfLSkpwCmE3md0h13hoYsIuar2zv7vouGLHnY+ezId+ZN9SEimAZbexFguhH0
BBclqsiZu9TtTCwhIy0xmDW2Iw8g7MKJI1V0g51ZJxK9J42mo4MRJSsbXQIDAQAB
AoGAe4uOaODc4hOhD8j3GNlVFb8qO1EoiCPIUfpoWqcgKT71bs7fNBmp4jzeKU+o
NlzJb6FGNyZtHRW7wJcKorOj5oWn0DqEyvpku4tYLvpW3t+hrTOm0unMhH1g03pn
89/gt82pBjGiKTxKVaEJmyDYdRSgtMFPZNQ1N+1C4bXxDdkCQQDy+KDm1PDyO7RA
zC/f+Gq5g5QLATVE6wMRBtaKGLNe5VRqENq08AZwdqbV3phvefpNU0aN/ktmVaxX
vL1POj7fAkEAhxlL+pYGDN0VD+o8IOC3VPFCZr1++Sodc8wOcQF8PpVHuyBUSEpv
J5MDJyJbQCF5yToV9npAEcHVKqhW5bM5QwJAAebiU4w9Kpg/C/bNNSKbq0IVaZSj
1xtD1eFI0qHo3YhMBdyF6b6rPjwfiDMK3GyHAg3x0nC4JF/tTm6CyNj63wJAdbov
oaCWiSMnNYUy/JuWZykOaiV7vnlazQvnEcbvlEHWDlUv3QcwMdZEixe/WPVTAW3i
sbT6m/7DWbb0cppprQJAMcVMi9tdUE2ZgBeCQBcIyI/K04K6VJ18cGM8SM7abw1D
zCpEWGKJdxM6YIYptdJgIjUaTYmmNtgYHDnaP/+1JA==
-----END RSA PRIVATE KEY-----`; //remember to erase when committing

router.use(function (req, res, next) {
  //for middlware
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

//login route
router.post("/login", async function (req, res, next) {
  //for persisting a new user
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

//register route
router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;
