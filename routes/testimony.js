const Testimony = require('../models/Testimony');
const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
//create a new Testimony;
router.post('/add', async (req, res) => {
    try {
        const newTestimony = new Testimony({
            subject: req.body.subject,
            testimony: req.body.testimony,
            fname: req.body.fname,
            lname: req.body.lname,
        });
        const savedTestimony = await newTestimony.save();
        res.status(200).json({ message: "Testimony Added", testimony: savedTestimony });
        console.log(savedTestimony);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//delete Testimony;
router.delete("/:id", verifyTokenAuthorization, async (req,res)=>{
    try{
        const deletedTestimony = await Testimony.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTestimony);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get Testimony
router.get("/:id", async (req,res)=>{
    try{
        const testimony = await Testimony.findById(req.params.id);
        res.status(200).json(testimony);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all Testimony;
router.get('/', async (req,res)=>{
    try{
        const testimony = await Testimony.find();
        res.status(200).json(testimony);
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router