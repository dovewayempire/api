const Prayer = require('../models/Prayer');
const router = require('express').Router();
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
//create a new Prayer;
router.post('/add', async (req, res) => {
    try {
        const newPrayer = new Prayer({
            subject: req.body.subject,
            prayer: req.body.prayer,
            fname: req.body.fname,
            lname: req.body.lname,
        });
        const savedPrayer = await newPrayer.save();
        res.status(200).json({ message: "Prayer Added", Prayer: savedPrayer });
        console.log(savedPrayer);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//delete Prayer;
router.delete("/:id", verifyTokenAuthorization, async (req,res)=>{
    try{
        const deletedPrayer = await Prayer.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPrayer);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get Prayer
router.get("/:id", async (req,res)=>{
    try{
        const prayer = await Prayer.findById(req.params.id);
        res.status(200).json(prayer);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all Prayer;
router.get('/', async (req,res)=>{
    try{
        const prayer = await Prayer.find();
        res.status(200).json(prayer);
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

module.exports = router