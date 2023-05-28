const mongodb = require('mongodb')
const mongoose = require('mongoose')

const rentcarsc =new mongoose.Schema(
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
        mobileno:
        {
            type: String,
            required:true,
            max:10
        },
        pickup_place:{
            type:String,
            required : true
        },
        email:
        {
            type: String,
            required:true
        },
        carName:{
            type: String,
            required:true
        },
        category:{
            type: String,
            required : true
        },
        no_of_seats:{
            type: Number,
            required : true
        },
        fuel_type:{
            type: String,
            required : true
        },
        first_date_availability:{
            type: Date,
            required:true
        },
        second_date_availability:{
            type: Date,
            required:true
        },
        vehicle_availability:{
            type:String,
            required:true
        },
        companyName:{
            type: String,
            required:true
        },
        ModelYear:{
            type: Number
        },
        color:{
            type: String,
            required:true
        },
        address:
        {
            type: String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        image1:
        {
            type: String,
            required:true
        },
        image2:
        {
            type: String,
            required:true
        },
        image3:
        {
            type: String,
            required:true
        },
        image4:
        {
            type: String,
            required:true
        }
    }
)

module.exports = mongoose.model('rentcarschema',rentcarsc)