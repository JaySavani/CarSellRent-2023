import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";


const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
        <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-car-line"></i>
                  <span>
                    Car Sell Rent<br /> Service
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              We Car Sell Rent Service Is Biggest Car Selling Renting Company In India In Very Few Years We Create Milestone 
              By Serving More Then 10000 Customer And As An Responsible Group We Donate Our 10% Profit In The Charity
              We Try Our Best To Provide Best Service To The Customer And Help Them In Every Possible Way.
            
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
            </div>
          </Col>
          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
            </div>
          </Col>
          <Col lg="1" md="4" sm="6">
            <div className="mb-4">
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">111 College Road, Nadiad, Gujarat,India.</p>
              <p className="office__info">Phone: +91 99999 88888</p>
              <p className="office__info">Email: carsellrent@gmail.com</p>
              <p className="office__info">Office Time: 10am - 7pm</p>
            </div>
          </Col>


          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
