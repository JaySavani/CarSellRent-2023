import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Review = () => {
  const [customername,setName] = useState('')
  const [email,setEmail] = useState('')
  const [review,setReview] = useState('')

  const AddReview = async (e) => {
    e.preventDefault();
    if(email===""||customername===""||review===""){
     alert("Please Provide All Necessary Information");
     return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/review/`,
    {
      'customer_id' : sessionStorage.getItem('id'),
      'customername' : customername,
      'email' : email,
      'review' : review
    },
    {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  }).then((res) => {
        alert("Successfully Complete The Task!"); 
        console.log(res); 
    }).catch((err) => {
        alert(err);
    });
     
  }

  return (
    <Fragment>
      <Header />
    <Helmet title="Review">
      <CommonSection title="Review" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Your Review Is Valuable For Us</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" value={customername} onChange={(e)=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Review"
                    className="textarea"
                    value={review}
                    onChange={(e)=>setReview(e.target.value)}
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit" onClick={AddReview}>
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  111 College Road,Nadiad
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+91 99999 88888</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">carsellrent@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>\
    <Footer />
    </Fragment>
  );
};

export default Review;
