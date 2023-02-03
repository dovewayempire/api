const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//Register route;
router.post("/register", async (req, res) => {
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    cpassword: CryptoJS.AES.encrypt(
      req.body.cpassword,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Login route;
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Wrong credentials");
    } else if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password) {
        res.status(401).json("Wrong credentials");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, cpassword, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/forget", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Wrong credentials");
    } else if (user) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3m" }
      );
      const { password, cpassword, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
      const link = `http://localhost:5000/api/auth/recovery/${user._id}/${accessToken}`;
      console.log(link);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/recovery/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(200).json({ message: "User does not exist" });
  } else {
    try {
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          return res.status(403).json("Token is invalid");
        } else {
          return res
            .status(200)
            .json({ user: user, message: "Token is valid" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

//get logged in user;
router.post("/userData", async (req, res) => {
  const accessToken = req.body.token;
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SEC);
    const id = user.id;
    await User.findOne({ _id: id }).then((data) => {
      const { password, cpassword, ...others } = data._doc;
      res
        .status(200)
        .json({ ...others, loggedIn: true, message: "User data retrieved" });
    });
  } catch (err) {
    res
      .status(500)
      .json({ err, loggedIn: false, message: "Failed To retrieve data" });
    console.log(err);
  }
});

module.exports = router;
