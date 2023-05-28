const express =require('express')
const router = express.Router()
const rentcarschema = require('../models/rentcarsc')
const multer = require('multer');
const upload = multer({dest:'./uploads'})
router.get("/",async(req,res)=>
{
    try{
        const rent_obj = await rentcarschema.find({vehicle_availability : "True"})
        res.json(rent_obj)
    }
    catch(e)
    {
        res.send(e);
    }
})
const cpUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },
{ name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }])
router.post("/",cpUpload,async(req,res)=>
{
    console.log(req.body)
    const rent_obj =new rentcarschema(
        {
            customer_id : req.body.customer_id,
            customername : req.body.customername,
            mobileno : req.body.mobileno,
            pickup_place:req.body.pickup_place,
            email : req.body.email,
            carName : req.body.carName,
            category : req.body.category,
            no_of_seats:req.body.no_of_seats,
            fuel_type:req.body.fuel_type,
            first_date_availability:req.body.first_date_availability,
            second_date_availability:req.body.second_date_availability,
            vehicle_availability:req.body.vehicle_availability,
            companyName : req.body.companyName,
            ModelYear : req.body.ModelYear,
            color : req.body.color,
            address : req.body.address,
            price: req.body.price,
            image1 : req.files.image1[0].path,
            image2 : req.files.image2[0].path,
            image3 : req.files.image3[0].path,
            image4 : req.files.image4[0].path,
        })
    try{
       const a1 =await rent_obj.save()
       res.json(a1)
    }
    catch(e)
    {
        res.send(e);
    }
})


router.put("/:id", (req, res) => {
    rentcarschema.findOneAndUpdate( {_id: req.params.id},req.body,{useFindAndModify: false},  function(err, result) {
        if (err) 
            return res.status(400).json({ error: err })
        return res.status(200).json( { result } )
    });			
});

router.delete("/:id", (req, res) => {
    rentcarschema.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err)
            return res.status(400).json({ error: err }) 
        return res.status(200).json({ result });
    });
});

router.get("/:id",async(req,res)=>
{
    try{
        const prop_obj = await rentcarschema.find({customer_id : req.params.id})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})

router.get("/car/:id",async(req,res)=>
{
    try{
        const prop_obj = await rentcarschema.findOne({_id : req.params.id,vehicle_availability : "True"})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})
const moment = require('moment');
router.get("/:carname/:fuel_type/:journeydate/:city/:cartype", async(req,res) => {
    const journeyDate = moment(req.params.journeydate, "YYYY-MM-DD").toDate();
    try{
        const prop_obj = await rentcarschema.find({
            $or : [
                { carName : req.params.carname },
                { fuel_type : req.params.fuel_type },
                { category : req.params.cartype }
            ],
            pickup_place : req.params.city,
            second_date_availability: {
                $gte: journeyDate,
            },
            first_date_availability: {
                $lte: journeyDate,
            },
            vehicle_availability : "True"
        });
        
        res.json(prop_obj)
    } catch(e) {
        res.send(e);
    }
});

module.exports =router
