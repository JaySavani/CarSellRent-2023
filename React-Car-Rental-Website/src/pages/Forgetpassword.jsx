import React, { useState } from 'react';
import { Input } from "reactstrap";
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/forget-password`,{ 
  'email' : email,
})
    .then(res => {
        alert(res.data);
    })
    .catch(error => {
        alert("Some Internal Error Try Again!!!");
    });
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <br></br>
      <Input
        label="Email"
        variant="outlined"
        placeholder='Enter Your Email Address'
        margin="normal"
        fullWidth
        value={email}
        onChange={handleEmailChange}
      />
      <br></br>
      <br></br>
      <button className="contact__btn"  onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
}

export default ForgetPassword;
