import React, { useState } from 'react';
import { Input } from "reactstrap";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ChangePassword() {
  const [password, setpassword] = useState('');
  const {email} = useParams();
  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const handleSendEmail = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/change-password`,{ 
  'email' : email,
  'password' : password
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
      <h1>Change Password</h1>
      <br></br>
      <Input
        label="Password"
        variant="outlined"
        placeholder='Enter Your New Password'
        margin="normal"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
      />
      <br></br>
      <br></br>
      <button className="contact__btn"  onClick={handleSendEmail}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;
