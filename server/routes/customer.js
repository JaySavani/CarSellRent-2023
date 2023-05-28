const express = require('express')
const router = express.Router()
const customerschema = require('../models/customersc')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.get("/", async (req, res) => {
    try {
        const cust_obj = await customerschema.find()
        res.json(cust_obj)
    }
    catch (e) {
        res.send(e);
    }
})

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    customerschema.findOne({ _id: _id }, (err, user) => {
        if (user!=undefined) {
            res.send(user);            
        } else {
            res.send({ error: "First Register Your self" })
        }
    });
})




router.put("/:id", (req, res) => {
    customerschema.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false }, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result })
    });
});

router.delete("/:id", (req, res) => {
    customerschema.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    });
});

router.post("/email",(req,res)=>{
    
    let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR EMAIL',
        pass: 'YOUR PASSWORD'
    }
});
 
let mailDetails = {
    from: 'YOUR EMAIL',
    to: req.body.to,
    subject: req.body.subject,
    html:`
    <div style="padding:10px;border-style:ridge">
        <p>You Have New Request For Your Car ${req.body.carName}.</p>
        <h1>Contact Details</h1>
        <ul>
            <li>First Name : ${req.body.firstname}</li>
            <li>Last Name : ${req.body.lastname}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone No. : ${req.body.phoneno}</li>
            <li>Message : ${req.body.description}</li>
        </ul>  `
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        res.send(err);
    } else {
        res.send('Email sent successfully');
    }
});
});


module.exports = router
