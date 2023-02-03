const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
    prayer:{type:String,required:true},
    subject:{type:String,required:true},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    count:{type:String,required:true,default:1},
},{timestamps:true})

module.exports = mongoose.model("prayer",PrayerSchema);