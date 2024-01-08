import React from "react";


import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";


import axios from "axios";


const checkout = async (amount) => {
  const {
    data: { key },
  } = await axios.get(`${process.env.REACT_APP_API_URL}/payment/getkey`,{
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
});


  const {
    data: { order },
  } = await axios.post(`${process.env.REACT_APP_API_URL}/payment/pay`, amount,{
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
});
  const options = {
    key: key, // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Car Sell Rent Application",
    description: "Transaction",
    image: "https://example.com/your_logo",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `${process.env.REACT_APP_API_URL}/payment/paymentverification`,
    // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
    prefill: {
      name: "xyz",
      email: "vatsal@example.com",
      contact: "1245214251",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#121212",
      // color: "#3399cc",
    },
  };
  console.log(options);
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};


const PaymentMethod = (amount) => {
  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
           Direct Bank Transfer
        </label>
      </div>


      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
           UPI Payment
        </label>
      </div>


      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          Debit Card
        </label>
        <img src={masterCard} alt="" />
      </div>


      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          Paypal
        </label>


        <img src={paypal} alt="" />
      </div>
      <div className="payment text-end mt-5">
        <button onClick={() => checkout(amount)}>Reserve Now</button>
      </div>
    </>
  );
};


export default PaymentMethod;



