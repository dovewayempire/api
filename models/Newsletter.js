const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
    email:{type:String,required:true},
},{timestamps:true})

module.exports = mongoose.model("newsletter",newsLetterSchema);