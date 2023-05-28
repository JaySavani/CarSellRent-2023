import { Container, Row, Col } from "reactstrap";
import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import FindCarForm from "../components/UI/FindCarForm";
import axios from "axios";
import CarItem1 from "../components/UI/CarItem1";
class CarRent extends React.Component {

  state ={
    carData : [],
    sortBy: "none"
  }
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/rentcar`,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  })
    .then((res)=>
    {
      const Carsdata1 = res.data;
      this.setState({carData : Carsdata1});
      console.log(this.state.carData)
    });
  }

  handleSortChange = (event) => {
    const sortByValue = event.target.value;
    this.setState({ sortBy: sortByValue });
  };

  render(){
    let sortedCarData = this.state.carData.slice(); // Make a copy of the array
    if (this.state.sortBy === "low") {
      sortedCarData.sort((a, b) => a.price - b.price);
    } else if (this.state.sortBy === "high") {
      sortedCarData.sort((a, b) => b.price - a.price);
    }

  return (
    <Fragment>
      <Header />
    <Helmet title="Cars">
      <CommonSection title="Car Listing For Rent" />
      
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                

                <select value={this.state.sortBy} onChange={this.handleSortChange}>
                      <option value="none">Select</option>
                      <option value="low">Low to High</option>
                      <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {sortedCarData.map((item) => (
                  <CarItem1 item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
    <Footer/>
    </Fragment>
  )};
};

export default CarRent;