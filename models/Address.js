const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true, default: "US" },
    company: { type: String, required: true },
    addressOne: { type: String, required: true },
    addressTwo: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    postalcode: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: String, required: true },
    checkStatus: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("address", AddressSchema);
