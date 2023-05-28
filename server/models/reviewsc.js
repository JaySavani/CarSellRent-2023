const mongodb = require('mongodb')
const mongoose = require('mongoose')

const reviewsc =new mongoose.Schema(
    {
        customer_id:{
            type:String,
            required:true
        },
        customername:
        {
            type: String,
            required:true
        },
        email:
        {
            type: String,
            required:true,
        },
        review:{
            type:String,
            required : true
        },
    }
)

module.exports = mongoose.model('reviewschema',reviewsc)