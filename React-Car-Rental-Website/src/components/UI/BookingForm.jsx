import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";

const BookingForm = (props) => {
  const [firstname,setfirstname] = useState("First Name");
  const [lastname,setlastname] = useState("Last Name");
  const [email,setemail] = useState("Email@abc.com");
  const [phoneno,setphoneno] = useState("9999999999");
  const [description,setdescription] = useState("Inquire To Owner");
  // const [to,setto] = useState("Inquire To Owner");
  // const [subject,setsubject] = useState();
  // const [carName,setcarName] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/customer/email`, {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phoneno": phoneno,
            "description": description,
            "to": props.to,
            "subject": "Inquiry Of Car",
            "carName" : props.carname
        },{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res) => {
            alert(res.data);
        }).catch((err) => {
            console.log(err);
        });
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" value={lastname} onChange={(e)=>setlastname(e.target.value)} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" value={phoneno} onChange={(e)=>setphoneno(e.target.value)} />
      </FormGroup>


      <FormGroup>
        <textarea
          rows={4}
          type="textarea"
          className="textarea"
          value={description} 
          onChange={(e)=>setdescription(e.target.value)}
        ></textarea>
      </FormGroup>

      <div className="payment text-end mt-5">
        <button>Send</button>
      </div>
    </Form>
  );
};

export default BookingForm;
