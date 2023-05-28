import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import axios from "axios";
import CarItem1 from "../components/UI/CarItem1";
import "../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";


const  Home = () => {
  const [carData, setCarData] = useState([]);
  const [carData1, setCarData1] = useState([]);
  const [carName, setCarName] = useState([]);
  const [cartype, setCartype] = useState("Mini Hatchbacks");
  const [fuel_type, setfuel_type] = useState("Petrol");
  const [city, setcity] = useState([]);
  const [journeydate, setJourneydate] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/sellcar`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        }).then((res) => {
      const Carsdata1 = res.data;
      setCarData(Carsdata1);
      console.log(carData);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/rentCar`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        }).then((res) => {
      const Carsdata1 = res.data;
      setCarData1(Carsdata1);
      console.log(carData1);
    });
  },[]);
  const Search  = async (e) => {
        e.preventDefault();
        await axios.get(`${process.env.REACT_APP_API_URL}/sellcar/`+carName+'/'+fuel_type+'/'+cartype,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res)=>
        {
          console.log(res);
          const Carsdata1 = res.data;
          setCarData(Carsdata1);

        });
    
        await axios.get(`${process.env.REACT_APP_API_URL}/rentCar/`+carName+'/'+fuel_type+'/'+journeydate+'/'+city+'/'+cartype,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res)=>
        {
          console.log(res);
          const Carsdata1 = res.data;
          setCarData1(Carsdata1);
        });    
    }
  return (
    <Fragment>
      <Header />
      <Helmet title="Home">
        <section className="p-0 hero__slider-section">
          <HeroSlider />

          <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="4" md="4">
                  <div className="find__cars-left">
                    <h2>Find your best car here</h2>
                  </div>
                </Col>

                <Col lg="8" md="8" sm="12">
                  <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Pick up City"  onChange={(e) => setcity(e.target.value)} required/>
        </FormGroup>

        <FormGroup className="form__group">
        <select name="Fuel" id="fuel" style={{width: '246px',height:'35px'}} onChange={(e) => setfuel_type(e.target.value)} required >
            <option value="Patrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Diesel">Diesel</option>
        </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" onChange={(e) => setJourneydate(e.target.value)} required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Car Name" onChange={(e) => setCarName(e.target.value)}  required />
        </FormGroup>
        
        <FormGroup className="select__group">
        <select name="car_category" id="car_category" style={{width: '246px',height:'40px'}} onChange={(e) => setCartype(e.target.value)}  >
               x<option value="Mini Hatchbacks">Mini Hatchbacks</option>
                <option value="Small Hatchbacks">Small Hatchbacks</option>
                <option value="Small Sedans or family car">Small Sedans or family car</option>
                <option value="Sedans">Sedans</option>
                <option value="Executive Segment">Executive Segment</option>
                <option value="Multipurpose">Multipurpose</option>
                <option value="Sports Utility Vehicles">Sports Utility Vehicles</option>
                <option value="Sports Car">Sports Car</option>
        </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn" onClick={Search}>Find Car</button>
        </FormGroup>
      </div>
    </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <AboutSection />
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">See our</h6>
                <h2 className="section__title">Popular Services</h2>
              </Col>

              <ServicesList />
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">Come with</h6>
                <h2 className="section__title">Best Offers For Buy Car</h2>
              </Col>

              {carData.slice(0, 6).map((item) => (
                <CarItem item={item} key={item.id} />
              ))}
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">Come with</h6>
                <h2 className="section__title">Best Offers For Rent Car</h2>
              </Col>

              {carData1.slice(0, 6).map((item) => (
                <CarItem1 item={item} key={item.id} />
              ))}
            </Row>
          </Container>
        </section>
      
    </Helmet>
    <Footer />
    </Fragment>
  )};


export default Home;

