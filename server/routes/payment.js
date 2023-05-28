const express = require('express')
const Razorpay = require('razorpay');
const router = express.Router()
const paymentschema = require('../models/paymentsc')
const crypto = require('crypto')


const { config } = require('dotenv')


config({ path: "./config/config.env" });




router.get("/", async (req, res) => {
    try {
        const pay_obj = await paymentschema.find()
        res.json(pay_obj)
    }
    catch (e) {
        res.send(e);
    }
})


router.post("/", async (req, res) => {
    const pay_obj = new paymentschema(
        {
            carid: req.body.carid,
            buyer_name: req.body.buyer_name,
            b_mobileno: req.body.b_mobileno,
            seller_name: req.body.seller_name,
            s_mobileno: req.body.s_mobileno,
            date: req.body.date,
            price: req.body.price,
        })
    try {
        const a1 = await pay_obj.save()
        res.json(a1)
    }
    catch (e) {
        res.send(e);
    }
})




router.put("/:id", (req, res) => {
    paymentschema.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false }, function (err, result) {
        if (err)
            return res.status(400).json({ error: err })
        return res.status(200).json({ result })
    });
});


router.delete("/:id", (req, res) => {
    paymentschema.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err)
            return res.status(400).json({ error: err })
        return res.status(200).json({ result });
    });
});


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

router.post('/pay', async (req, res) => {
    const options = {
        amount: Number(req.body.amount),
        currency: "INR",
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        return res.status(200).json({ order })
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/getkey', async (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})


router.post('/paymentverification', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const crypto = require("crypto");
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);
    const isauthentic = expectedSignature === razorpay_signature;
    if (isauthentic) {
        // store in database
    }
    else {
        console.log("sig received ", razorpay_signature);
        console.log("sig generated ", expectedSignature);
        res.status(400).json({ success: false, })
    }
})


module.exports = router



