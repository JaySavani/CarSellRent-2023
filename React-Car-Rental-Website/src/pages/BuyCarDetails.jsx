import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { Fragment } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function BuyCarDetails (){

  const {id} = useParams();
  const [customername, setCustomername] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [email, setEmail] = useState('');
  const [carName, setCarName] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [ModelYear, setModelYear] = useState('');
  const [color, setcolor] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');
  const [no_of_seats, setno_of_seats] = useState('');
  const [fuel_type, setfuel_type] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [singleCarItem,setSingleCarItem] = useState();

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/sellcar/car/`+id,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  })
    .then((res)=>
    {
      setSingleCarItem(res.data);
      setCarName(singleCarItem.carName)
      setCustomername(singleCarItem.customername)
      setMobileno(singleCarItem.mobileno)
      setEmail(singleCarItem.email)
      setcompanyName(singleCarItem.companyName)
      setModelYear(singleCarItem.ModelYear)
      setcolor(singleCarItem.color)
      setcategory(singleCarItem.category)
      setprice(singleCarItem.price)
      setno_of_seats(singleCarItem.no_of_seats)
      setfuel_type(singleCarItem.fuel_type)
      setImage1(singleCarItem.image1)
      setImage2(singleCarItem.image2)
      setImage3(singleCarItem.image3)
      setImage4(singleCarItem.image4)
      
    });
  })
    
  

  return (
    <Fragment>
      <Header />
    <Helmet title={carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={`${process.env.REACT_APP_API_URL}/${image1}`} alt="" className="w-100" />
            </Col>
            <Col lg="6">
              <img src={`${process.env.REACT_APP_API_URL}/${image2}`} alt="" className="w-100" />
            </Col>
            </Row>
            <Row>
            <Col lg="6">
              <img src={`${process.env.REACT_APP_API_URL}/${image3}`} alt="" className="w-100" />
            </Col>
            <Col lg="6">
              <img src={`${process.env.REACT_APP_API_URL}/${image4}`} alt="" className="w-100" />
            </Col>
            </Row>
            <Row>

            <Col lg="6">
              <div className="car__info">
              <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                <h2 className="section__title">{carName}</h2>
                
                  <h6 className="rent__price fw-bold fs-4">
                    {price} INR/ Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <h5>
                    Fuel Type      : <span style={{ color: "#f9a826" }}>{fuel_type}<br></br></span>
                    Car Category   : <span style={{ color: "#f9a826" }}>{category}<br></br></span>
                    No. Of Seats   : <span style={{ color: "#f9a826" }}>{no_of_seats}<br></br></span>
                    </h5>
                  </span>
                </div>

                <p className="section__description">
                  Owner Name : {customername}<br></br>
                  Owner MobileNo. : {mobileno}<br></br>
                  Owner Email : {email}<br></br>
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {ModelYear}
                  </span>


                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {color}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >


                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {companyName}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Send Enquiry</h5>
                <BookingForm carname={carName} to={email} />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod amount={price}/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
    <Footer/>
    </Fragment>
  );
};

export default BuyCarDetails;
