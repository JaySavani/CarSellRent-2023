const mongodb = require('mongodb')
const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
const customersc = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        mobileno:
        {
            type: String,
            required: true,
            max: 10
        },
        email:
        {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        confirmpassword:
        {
            type: String,
            required: true
        },

    }
)
// hash the password
customersc.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  customersc.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('customerschema', customersc)