const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json())
try{
    const url = 'mongodb+srv://vatsalvasani:vatsalvasani@cluster0.dc8bxub.mongodb.net/carsellrent';
    mongoose.connect(url);
    const con = mongoose.connection;
    
    con.on('open',function(){
    
    console.log("connected");
    
    })
}
catch(e){console.log(e);}

app.use(cors());

const authrouter = require('./routes/auth')
app.use('/auth', authrouter)
app.use('/uploads',express.static('uploads'))
const sellcarrouter = require('./routes/sellcar')
app.use('/sellcar', sellcarrouter)

const rentcarrouter = require('./routes/rentcar')
app.use('/rentcar', rentcarrouter)

const payrouter = require('./routes/payment')
app.use('/payment',authenticateToken, payrouter)

const jwt = require('jsonwebtoken');
const secretKey = '12abcd342hkjsd';

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
const customerrouter = require('./routes/customer')
app.use('/customer',authenticateToken, customerrouter)



const reviewrouter = require('./routes/review')
app.use('/review',authenticateToken, reviewrouter)



app.listen(8080,()=>
{
    console.log("Its Connected To The Port 8080")
})