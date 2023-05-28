import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

import "../../styles/user.css";
import Header2 from '../../components/Header/Header2';
import Footer from '../../components/Footer/Footer';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/rentcar/`,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res)=>
        {
            tasks = res.data;    
            console.log(tasks)      
        });   
        let result = [];
        result.push(tasks)
      console.log(result)
      return Promise.resolve(tasks);
    },
    update: async (data) => {
      const task = tasks.find(t => t._id === data._id);
      console.log(task)
      task.customer_name = data.customer_name;
      task.mobileno = data.mobileno;
      task.pickup_place = data.pickup_place;
      task.email = data.email;
      task.carName = data.carName;
      task.category = data.category;
      task.no_of_seats = data.no_of_seats;
      task.fuel_type = data.fuel_type;
      task.first_date_availability = data.first_date_availability;
      task.second_date_availability = data.second_date_availability;
      task.vehicle_availability = data.vehicle_availability;
      task.companyName = data.companyName;
      task.ModelYear = data.ModelYear;
      task.color = data.color;
      task.address = data.address;
      task.price = data.price;
    await axios.put(`${process.env.REACT_APP_API_URL}/rentcar/`+data._id,task,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  })
        .then((res)=>
        {    
            console.log(res)      
        });
        service.fetchItems();   
      return Promise.resolve(tasks);
    },
    delete: async(data) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/rentcar/`+data._id,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res)=>
        {    
            console.log(res)      
        });
      service.fetchItems();   
      return Promise.resolve(tasks);
    },
  };

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Admin_RentCar = () => (
    <body>
    <Header2></Header2>
  <div style={styles.container}>
    <CRUDTable
      caption="Cars Info Added By User For Rent"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="_id"
          label="Car Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="customername"
          label="Customer Name"
          placeholder="Customer Name"
        />
        <Field
          name="mobileno"
          label="Mobile No."
          placeholder="Mobile No."

        />
        <Field
          name="pickup_place"
          label="PickUp Place"
          placeholder="PickUp Place"

        />
        <Field
          name="email"
          label="Email"
          placeholder="Email"

        />
        <Field
          name="address"
          label="Address Of Owner"
          placeholder="Address"
       
        />
        <Field
          name="carName"
          label="Car Name"
          placeholder="Car Name"

        />
        <Field
          name="category"
          label="Category"
          placeholder="Category"

        />
        <Field
          name="no_of_seats"
          label="No. Of Seats"
          placeholder="No. Of Seats"
        
        />
        <Field
          name="fuel_type"
          label="Fuel Type"
          placeholder="Fuel Type"
         
        />
        <Field
          name="first_date_availability"
          label="First Date Of Availability"
          placeholder="First Date Of Availability"
        
        />
        <Field
          name="second_date_availability"
          label="Second Date Of Availability"
          placeholder="Second Date Of Availability"
       
        />
        <Field
          name="vehicle_availability"
          label="Vehicle Avalibility"
          placeholder="Vehicle Avalibility"

        />
        <Field
          name="companyName"
          label="Company Name"
          placeholder="Company Name"
        
        />
        <Field
          name="ModelYear"
          label="Model Year"
          placeholder="Model Year"
         
        />
        <Field
          name="color"
          label="Color"
          placeholder="Color"
        
        />
        
        <Field
          name="price"
          label="Price"
          placeholder="Price"
       
        />

        



      </Fields>

      <UpdateForm
        title="Review Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if(values.customername===""||values.mobileno===""||values.pickup_place===""||values.carName===""||values.companyName===""||values.ModelYear===""||
          values.color===""||values.address===""||values.category===""||values.price===""||values.no_of_seats===""||values.fuel_type===""||
          values.email===""||values.first_date_availability===""||values.second_date_availability===""||values.vehicle_availability===""||
          values.image1===""||values.image2===""||values.image3===""){
          errors.description = "Please Provide All Necessary Information";

       }
          return errors;
        }}
      />

      <DeleteForm
        title="Review Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values._id) {
            errors._id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
  <Footer></Footer>
  </body>
);
export default Admin_RentCar;