// import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
// import Footer from "../components/Footer/Footer";
// import Header from "../components/Header/Header";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import axios from 'axios';
// import { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { ColorPicker, useColor } from "react-color-palette";
// import Dropdown from 'react-dropdown';
// import "../styles/contact.css";


// const SellCar = () => {

//   const [customername, setCustomername] = useState('');
//   const [mobileno, setMobileno] = useState('');
//   const [email, setEmail] = useState('');
//   const [carName, setCarName] = useState('');
//   const [companyName, setcompanyName] = useState('');
//   const [ModelYear, setModelYear] = useState('');
//   const [color, setcolor] = useState('');
//   const [category, setcategory] = useState('Executive Segment');
//   const [price, setprice] = useState('');
//   const [no_of_seats, setno_of_seats] = useState('');
//   const [fuel_type, setfuel_type] = useState('Patrol');
//   const [address, setAddress] = useState("Address");
//   const [vehicle_availability, setvehicle_availability] = useState('True');
//   const [image1, setImage1] = useState('');
//   const [image2, setImage2] = useState('');
//   const [image3, setImage3] = useState('');
//   const [image4, setImage4] = useState('');

//   const AddCar = async (e) => {
//        e.preventDefault();
//        if(customername===""||mobileno===""||carName===""||companyName===""||ModelYear===""||
//        color===""||address===""||category===""||price===""||no_of_seats===""||fuel_type===""||
//        email===""||vehicle_availability===""||
//        image1===""||image2===""||image3===""){
//         alert("Please Provide All Necessary Information");
//         return;
//        }

//        console.log(image1)
//        const formData = new FormData();
//        formData.append('customer_id',sessionStorage.getItem('id'))
//        formData.append('customername' , customername)
//        formData.append('mobileno' , mobileno)
//         formData.append('email' , email)
//         formData.append('carName' , carName)
//         formData.append('companyName' , companyName)
//         formData.append('ModelYear' , ModelYear)
//         formData.append('color' , color)
//         formData.append('address' , address)
//         formData.append('category' , category)
//         formData.append('price' , price)
//         formData.append('no_of_seats' , no_of_seats)
//         formData.append('fuel_type' , fuel_type)
//         formData.append('vehicle_availability' , vehicle_availability)
//         formData.append('image1' , image1)
//         formData.append('image2' , image2)
//         formData.append('image3' , image3)
//         formData.append('image4' , image4)
//         console.log(formData)
//        await axios.post('http://localhost:8080/sellcar/',formData,{
//         headers: {
//           'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//     }).then((res) => {
//            alert("Successfully Complete The Task!"); 
//            console.log(res); 
//        }).catch((err) => {
//            alert(err);
//        });
        
//      }

//   return (
//     <Fragment>
//       <Header />
//     <Helmet title="Car For Sell">
//       <CommonSection title="Car For Sell" />
//       <section>
//         <Container>
//               <Form>
//                 <Row>
//               <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Your Name" type="text" value={customername} onChange={(e) => setCustomername(e.target.value)}  required/>
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Email" pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//                 </FormGroup>
//                 </Col>
//                 </Row>

//                 <FormGroup className="contact__form">
//                   <textarea
//                     rows="3"
//                     placeholder="Address"
//                     className="textarea"
//                     value={address} onChange={(e) => setAddress(e.target.value)}
//                   ></textarea>
//                 </FormGroup>

//                 <Row>
//               <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Mobile No."  type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={mobileno} onChange={(e) => setMobileno(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Car Name"  type="text" value={carName} onChange={(e) => setCarName(e.target.value)}/>
//                 </FormGroup>
//                 </Col>
//                 </Row>

//                 <Row>
//               <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Model Year"  type="Number" min="2000" max="2023"  value={ModelYear} onChange={(e) => setModelYear(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="Color"  type="text"  value={color} onChange={(e) => setcolor(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="CompanyName"  type="text"  value={companyName} onChange={(e) => setcompanyName(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                 <FormGroup className="contact__form">
//                   <Input placeholder="No Of Seats"  type="Number"  value={no_of_seats} min="2" max="8" onChange={(e) => setno_of_seats(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                 <Input placeholder="Price"  type="text"  value={price} onChange={(e) => setprice(e.target.value)}  />
//                 </FormGroup>
//                 </Col>
//                 </Row>


//                 <Row>
//                 <Col>
//                 <FormGroup className="contact__form">
//                 <select name="cars" id="cars" style={{width: '400px',height:'35px'}} defaultValue={category} onChange={(e) => setcategory(e.target.value)}>
//                 <option value="Mini Hatchbacks">Mini Hatchbacks</option>
//                 <option value="Small Hatchbacks">Small Hatchbacks</option>
//                 <option value="Small Sedans or family car">Small Sedans or family car</option>
//                 <option value="Sedans">Sedans</option>
//                 <option value="Executive Segment">Executive Segment</option>
//                 <option value="Multipurpose">Multipurpose</option>
//                 <option value="Sports Utility Vehicles">Sports Utility Vehicles</option>
//                 <option value="Sports Car">Sports Car</option>                
//                 </select>     
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                 <select name="Fuel" id="fuel" style={{width: '400px',height:'35px'}} defaultValue={fuel_type} onChange={(e) => setfuel_type(e.target.value)} >
//     <option value="Patrol">Patrol</option>
//     <option value="Electric">Electric</option>
//     <option value="Diesel">Diesel</option>
//   </select>
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                 <select name="vehicle_availability" id="vehicle_availability" style={{width: '400px',height:'35px'}} defaultValue={vehicle_availability} onChange={(e) => setvehicle_availability(e.target.value)} >
//     <option value="True">True</option>
//     <option value="False">False</option>
//   </select>
//                 </FormGroup>
//                 </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                 <FormGroup className="contact__form">
//                   <Input multiple type="file"  onChange={(e) => setImage1(e.target.files[0])}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input multiple type="file"  onChange={(e) => setImage2(e.target.files[0])}  />
//                 </FormGroup>
//                 </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                 <FormGroup className="contact__form">
//                   <Input multiple type="file"  onChange={(e) => setImage3(e.target.files[0])}  />
//                 </FormGroup>
//                 </Col>
//                 <Col>
//                 <FormGroup className="contact__form">
//                   <Input multiple type="file"  onChange={(e) => setImage4(e.target.files[0])}  />
//                 </FormGroup>
//                 </Col>
//                 </Row>




//                 <button className="contact__btn" type="submit" 
//                 onClick={AddCar}
//                 >
//                   Publish For Sold
//                 </button>
//               </Form>
//             {/* </Col>
//             </Col>
//           </Row> */}
//         </Container>
//       </section>
//     </Helmet>
//     <Footer />
//     </Fragment>
//   );
// };

// export default SellCar;






import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import Dropdown from "react-dropdown";
import "../styles/contact.css";

const SellCar = () => {
  const [customername, setCustomername] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [email, setEmail] = useState("");
  const [carName, setCarName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [ModelYear, setModelYear] = useState("");
  const [color, setcolor] = useState("");
  const [category, setcategory] = useState("Executive Segment");
  const [price, setprice] = useState("");
  const [no_of_seats, setno_of_seats] = useState("");
  const [fuel_type, setfuel_type] = useState("Patrol");
  const [address, setAddress] = useState("Address");
  const [vehicle_availability, setvehicle_availability] = useState("True");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const AddCar = async (e) => {
    e.preventDefault();
    if (
      customername === "" ||
      mobileno === "" ||
      carName === "" ||
      companyName === "" ||
      ModelYear === "" ||
      color === "" ||
      address === "" ||
      category === "" ||
      price === "" ||
      no_of_seats === "" ||
      fuel_type === "" ||
      email === "" ||
      vehicle_availability === "" ||
      image1 === "" ||
      image2 === "" ||
      image3 === ""
    ) {
      alert("Please Provide All Necessary Information");
      return;
    }
    console.log(image1)
    const formData = new FormData();
    formData.append("customer_id", sessionStorage.getItem("id"));
    formData.append("customername", customername);
    formData.append("mobileno", mobileno);
    formData.append("email", email);
    formData.append("carName", carName);
    formData.append("companyName", companyName);
    formData.append("ModelYear", ModelYear);
    formData.append("color", color);
    formData.append("address", address);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("no_of_seats", no_of_seats);
    formData.append("fuel_type", fuel_type);
    formData.append("vehicle_availability", vehicle_availability);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/sellcar/`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        alert("Successfully Complete The Task!");
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Fragment>
      <Header />
      <Helmet title="Car For Sell">
        <CommonSection title="Car For Sell" />
        <section>
          <Container>
            <Form>
              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Your Name"
                      type="text"
                      value={customername}
                      onChange={(e) => setCustomername(e.target.value)}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Email"
                      pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup className="contact__form">
                <textarea
                  rows="3"
                  placeholder="Address"
                  className="textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </FormGroup>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Mobile No."
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      value={mobileno}
                      onChange={(e) => setMobileno(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Car Name"
                      type="text"
                      value={carName}
                      onChange={(e) => setCarName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Model Year"
                      type="Number"
                      min="2000"
                      max="2023"
                      value={ModelYear}
                      onChange={(e) => setModelYear(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Color"
                      type="text"
                      value={color}
                      onChange={(e) => setcolor(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="CompanyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setcompanyName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="No Of Seats"
                      type="Number"
                      value={no_of_seats}
                      min="2"
                      max="8"
                      onChange={(e) => setno_of_seats(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Price"
                      type="text"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <select
                      name="cars"
                      id="cars"
                      style={{ width: "400px", height: "35px" }}
                      defaultValue={category}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      <option value="Mini Hatchbacks">Mini Hatchbacks</option>
                      <option value="Small Hatchbacks">Small Hatchbacks</option>
                      <option value="Small Sedans or family car">
                        Small Sedans or family car
                      </option>
                      <option value="Sedans">Sedans</option>
                      <option value="Executive Segment">
                        Executive Segment
                      </option>
                      <option value="Multipurpose">Multipurpose</option>
                      <option value="Sports Utility Vehicles">
                        Sports Utility Vehicles
                      </option>
                      <option value="Sports Car">Sports Car</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <select
                      name="Fuel"
                      id="fuel"
                      style={{ width: "400px", height: "35px" }}
                      defaultValue={fuel_type}
                      onChange={(e) => setfuel_type(e.target.value)}
                    >
                      <option value="Patrol">Patrol</option>
                      <option value="Electric">Electric</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <select
                      name="vehicle_availability"
                      id="vehicle_availability"
                      style={{ width: "400px", height: "35px" }}
                      defaultValue={vehicle_availability}
                      onChange={(e) => setvehicle_availability(e.target.value)}
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      multiple
                      type="file"
                      onChange={(e) => setImage1(e.target.files[0])}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      multiple
                      type="file"
                      onChange={(e) => setImage2(e.target.files[0])}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      multiple
                      type="file"
                      onChange={(e) => setImage3(e.target.files[0])}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="contact__form">
                    <Input
                      multiple
                      type="file"
                      onChange={(e) => setImage4(e.target.files[0])}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <button className="contact__btn" type="submit" onClick={AddCar}>
                Publish For Sold
              </button>
            </Form>
            {/* </Col>
            </Col>
          </Row> */}
          </Container>
        </section>
      </Helmet>
      <Footer />
    </Fragment>
  );
};

export default SellCar;

