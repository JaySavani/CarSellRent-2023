const express = require('express')
const router = express.Router()
const reviewsc = require('../models/reviewsc')

router.post("/", async (req, res) => {
    const review_obj = new reviewsc(
        {
            customer_id : req.body.customer_id,
            customername: req.body.customername,
            email: req.body.email,
            review: req.body.review,
        })
        try{
            const a1 = await review_obj.save()
            res.json(a1)
        }
        catch (err) {
        res.send(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const review_obj = await reviewsc.find()
        res.json(review_obj)
    }
    catch (e) {
        res.send(e);
    }
})

router.put("/:id", (req, res) => {
    reviewsc.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false }, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result })
    });
});

router.delete("/:id", (req, res) => {
    reviewsc.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    });
});

module.exports = router
