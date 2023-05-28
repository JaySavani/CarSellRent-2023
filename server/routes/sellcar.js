const express = require('express')
const router = express.Router()
const sellcarschema = require('../models/sellcarsc')
const multer = require('multer');
const upload = multer({dest:'./uploads'})

router.get("/",async(req,res)=>
{
    try{
        const prop_obj = await sellcarschema.find({vehicle_availability : "True"})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})
const cpUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },
{ name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }])

router.post("/",cpUpload,async(req,res)=>
{
    console.log(req.files)
    const prop_obj = new sellcarschema(
        {
            customer_id : req.body.customer_id,
            customername : req.body.customername,
            mobileno : req.body.mobileno,
            email : req.body.email,
            carName : req.body.carName,
            companyName : req.body.companyName,
            ModelYear : req.body.ModelYear,
            color : req.body.color,
            address : req.body.address,
            category : req.body.category,
            price : req.body.price,
            no_of_seats : req.body.no_of_seats,
            fuel_type : req.body.fuel_type,
            vehicle_availability : req.body.vehicle_availability,
            image1 : req.files.image1[0].path,
            image2 : req.files.image2[0].path,
            image3 : req.files.image3[0].path,
            image4 : req.files.image4[0].path,

        })
        try{
            const a1 = await prop_obj.save()
            res.json(a1) 
        }catch(err)
        {
            res.send(err)
        }
})

router.put("/:id", (req, res) => 
{
    sellcarschema.findOneAndUpdate( {_id: req.params.id}, req.body,{useFindAndModify: false}, function(err, result) 
    {
        if (err) 
        {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json( { result } )          
    });			
});

router.delete("/:id", (req, res) => {
    sellcarschema.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err)
        {
            return res.status(400).json({ error: err }) 
        }
        return res.status(200).json({ result });
    });
});

router.get("/:id",async(req,res)=>
{
    try{
        const prop_obj = await sellcarschema.find({customer_id : req.params.id})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})

router.get("/car/:id",async(req,res)=>
{
    try{
        const prop_obj = await sellcarschema.findOne({_id : req.params.id,vehicle_availability : "True"})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})

router.get("/:carname/:fuel_type/:cartype",async(req,res)=>
{
    try{
        const prop_obj = await sellcarschema.find({$or : [{carName : req.params.carname},
            {fuel_type : req.params.fuel_type},{category : req.params.cartype}],vehicle_availability : "True"})
        res.json(prop_obj)
    }
    catch(e){
        res.send(e);
    }
})

module.exports=router
