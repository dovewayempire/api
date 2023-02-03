const mongoose = require('mongoose');

const TestimonySchema = new mongoose.Schema({
    testimony:{type:String,required:true},
    subject:{type:String,required:true},
    fname:{type:String,required:true},
    lname:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model("testimony",TestimonySchema);