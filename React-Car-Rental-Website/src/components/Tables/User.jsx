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
let result = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/customer/`+sessionStorage.getItem('id'),{
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
        result = [];
        result.push(tasks)
        let result1 = Array.from(result);
      console.log(result1)
      return Promise.resolve(result1);
    },
    update: async (data) => {
      const task = result.find(t => t._id === data._id);
      console.log(task)
      task.name = data.name;
      task.mobileno = data.mobileno;
      task.email = data.email;
      task.address = data.address;
    await axios.put(`${process.env.REACT_APP_API_URL}/customer/`+task._id,task,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  })
        .then((res)=>
        {    
            console.log(res)      
        });
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

const UserTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Your Information"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="_id"
          label="User Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="name"
          label="User Name"
          placeholder="Your Name"
        />
        <Field
          name="mobileno"
          label="Contact No"
          placeholder="Your Contact No."
        />
      <Field
          name="email"
          label="Email"
          placeholder="Your Email"
        />
        <Field
          name="address"
          label="Address"
          placeholder="Your Address"
        />
      </Fields>

      <UpdateForm
        title="User Update Process"
        message="Update Your Profile"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values._id) {
            errors.id = 'Please, provide id';
          }

          if (!values.name) {
            errors.title = 'Please, provide Your Name';
          }

          if (!values.mobileno) {
            errors.description = 'Please, provide contact No.';
          }
          if (!values.email) {
            errors.description = 'Please, provide Address';
          }
          if (!values.address) {
            errors.description = 'Please, provide Blood Type';
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Account Delete Process"
        message="Are you sure you want to delete Your Account?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values._id) {
            errors._id = 'Please, provide Your id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
export default UserTable;