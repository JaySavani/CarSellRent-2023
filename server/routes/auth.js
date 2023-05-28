const express = require('express')
const router = express.Router()
const customerschema = require('../models/customersc')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');


const secretKey = '12abcd342hkjsd';

function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secretKey, options);
}


router.post("/Login", (req, res) => {
    const { email, password } = req.body;
    customerschema.findOne({ email: email }, (err, user) => {
        if (user!=undefined) {
            if (user.validPassword(password)) {
                const token = generateToken(user);
                res.send({ message: "login success", user: user, token:token })
            } else {
                res.send({ error: "Invalid Credentials" })
            }
        } else {
            res.send({ error: "First Register Your self" })
        }
    });
});

router.post("/", async (req, res) => {
    
    const cust_obj = new customerschema(
        {
            name: req.body.name,
            mobileno: req.body.mobileno,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        })
    try {
        if (cust_obj.password == cust_obj.confirmpassword) {
            cust_obj.password = cust_obj.generateHash(cust_obj.password);
            cust_obj.confirmpassword = cust_obj.password;
            const a1 = await cust_obj.save()
            res.json(a1)
        }
        else {
            res.send({error:"Password And Confirm Password Does Not Match."});
        }

    } catch (err) {
        res.send(err)
    }
})


router.post("/forget-password", async (req, res) => {
    email = req.body.email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR EMAIL',
            pass: 'YOUR PASSWORD'
        }
      });
    
      const mailOptions = {
        from: 'YOUR EMAIL',
        to: email,
        subject: 'Reset your password',
        html: `<p>Please click <a href="http://localhost:3000/forgetpassword/${email}">here</a> to reset your password.</p>`
      };
    
        transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
                console.log(err);
                res.send('No Internet')
            } else {
                res.send('Email sent successfully');
            }
        });
});

function generatehash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

router.post("/change-password", async (req, res) => {
    const pass = generatehash(req.body.password)
    customerschema.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: pass } },
        { useFindAndModify: false }, function (err, result) {
            if (err) {
                return res.send("Internet Is Slow!!")
            }
            return res.send("Password Change Successfully!!")
        }
    );
    
});

module.exports = router