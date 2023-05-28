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
        await axios.get(`${process.env.REACT_APP_API_URL}/customer/`,{
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
      task.name = data.name;
      task.mobileno = data.mobileno;
      task.email = data.email;
      task.address = data.address;
      
    await axios.put(`${process.env.REACT_APP_API_URL}/customer/`+data._id,task,{
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/customer/`+data._id,{
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

const Admin_User = () => (
    <body>
        <Header2></Header2>
  <div style={styles.container}>
    <CRUDTable
      caption="User Info"
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
          name="name"
          label="Customer Name"
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

      </Fields>

      <UpdateForm
        title="Review Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if(values.name===""||values.mobileno===""||values.email===""||values.address===""){
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
export default Admin_User;