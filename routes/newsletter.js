const Newsletter = require('../models/Newsletter');
const router = require('express').Router();
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');

//create a new Newsletter;
router.post('/', async(req,res)=>{
    const newNewsletter = new Newsletter({
        email:req.body.email,
    });
    try{
        const savedNewsletter = await newNewsletter.save();
        res.status(200).json("Newsletter Added");
        console.log(savedNewsletter);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


//delete Newsletter;
router.delete("/:id", verifyTokenAuthorization, async (req,res)=>{
    try{
        const deletedNewsletter = await Newsletter.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedNewsletter);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get Newsletter
router.get("/:id", async (req,res)=>{
    try{
        const Newsletter = await Newsletter.findById(req.params.id);
        res.status(200).json(Newsletter);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all newsletter;
router.get('/', async (req,res)=>{
    try{
        const newsletter = await Newsletter.find();
        res.status(200).json(newsletter);
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router