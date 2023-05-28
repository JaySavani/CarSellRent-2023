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

// Component's Base CSS
import "../../styles/user.css";


const DescriptionRenderer = ({ field }) => <textarea {...field} />;
let tasks = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/sellcar/`+sessionStorage.getItem('id'),{
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
      task.email = data.email;
      task.carName = data.carName;
      task.category = data.category;
      task.no_of_seats = data.no_of_seats;
      task.fuel_type = data.fuel_type;
      task.vehicle_availability = data.vehicle_availability;
      task.companyName = data.companyName;
      task.ModelYear = data.ModelYear;
      task.color = data.color;
      task.address = data.address;
      task.price = data.price;
    await axios.put(`${process.env.REACT_APP_API_URL}/sellcar/`+data._id,task,{
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/sellcar/`+data._id,{
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

const SellCarTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Cars Info Added By You For Sell"
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
          // type = "date"
          placeholder="Customer Name"
        />
        <Field
          name="mobileno"
          label="Mobile No."
          placeholder="Mobile No."

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
        title="Car Information Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if(values.customername===""||values.mobileno===""||values.carName===""||values.companyName===""||values.ModelYear===""||
          values.color===""||values.address===""||values.category===""||values.price===""||values.no_of_seats===""||values.fuel_type===""||
          values.email===""||values.vehicle_availability===""||
          values.image1===""||values.image2===""||values.image3===""){
            errors.price = "Please Provide All Details";

       }
          return errors;
        }}
      />

      <DeleteForm
        title="Car Information Delete Process"
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
);
export default SellCarTable;