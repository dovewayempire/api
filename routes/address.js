const Address = require("../models/Address");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
//create a new Address;
router.post("/", verifyToken, async (req, res) => {
  const data = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    company: req.body.company,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    city: req.body.city,
    country: req.body.country,
    province: req.body.province,
    phone: req.body.phone,
    postalcode: req.body.postalcode,
    userId: req.userId,
  };
  const newAddress = new Address(data);
  try {
    const existingAddress = Address.findOneAndUpdate({userId:newAddress.userId}, {$set: {newAddress}}, {new: true, upsert: true}, (err, doc) => {
    if (err) {
      return res.status(500).json({error: err});
    }
    console.log(newAddress);
    return res.json(newAddress);
  });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//update Address;
// router.post("/update/:id", verifyTokenAuthorization, async (req, res) => {
//   const id = req.params.id;
//   const updates = req.body;
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }
//   try {
//     const updatedAddress = await Address.findByIdAndUpdate(
//       id,
//       {
//         $set: updates,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedAddress);
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });

//delete Address;
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAddress);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get Address
router.get("/me", verifyToken, async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req?.userId });
    console.log({ address, userId: req?.userId });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all Addresss;
router.get("/", async (req, res) => {
  try {
    const Addresss = await Address.find();
    res.status(200).json(Addresss);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
