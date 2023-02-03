const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//change user data;
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete user;
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User had been deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all users;
router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const users = await User.find({isAdmin:false}, ["fname", "lname", "email", "phone","createdAt"]);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/stats", verifyTokenAdmin, async (req, res) => {
  try {
    // return count of all users, products, orders in a single object

    // Count all non-admin users
    const users = await User.countDocuments({ isAdmin: false });
    const data = {
      users,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get user
router.get("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
