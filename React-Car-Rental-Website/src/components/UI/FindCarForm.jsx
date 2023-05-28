import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Pick up City" required />
        </FormGroup>

        <FormGroup className="form__group">
        <select name="Fuel" id="fuel" style={{width: '246px',height:'35px'}} >
            <option value="Patrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Diesel">Diesel</option>
        </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Car Name" required />
        </FormGroup>
        
        <FormGroup className="select__group">
        <select name="car_category" id="car_category" style={{width: '246px',height:'40px'}} >
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
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;