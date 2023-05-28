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
import Footer from '../../components/Footer/Footer';
import Header2 from '../../components/Header/Header2';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/review/`,{
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
  //   update: async (data) => {
  //     const task = tasks.find(t => t._id === data._id);
  //     console.log(task)
  //     task.customername = data.customername;
  //     task.email = data.email;
  //     task.review = data.review;
  //   await axios.put("http://localhost:8080/review/"+data._id,task,{
  //     headers: {
  //       'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  //       'Content-Type': 'application/json',
  //     },
  // })
  //       .then((res)=>
  //       {    
  //           console.log(res)      
  //       });
  //       service.fetchItems();   
  //     return Promise.resolve(tasks);
  //   },
  //   delete: async(data) => {
  //       await axios.delete("http://localhost:8080/review/"+data._id,{
  //         headers: {
  //           'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  //           'Content-Type': 'application/json',
  //         },
  //     })
  //       .then((res)=>
  //       {    
  //           console.log(res)      
  //       });
  //     service.fetchItems();   
  //     return Promise.resolve(tasks);
  //   },
  };

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Admin_Review = () => (
    <body>
        <Header2></Header2>
  <div style={styles.container}>
    <CRUDTable
      caption="Review Add By User"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="_id"
          label="Review Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="customername"
          label="Customer Name"
          placeholder="Customer Name"
        />
        <Field
          name="email"
          label="Email"
          placeholder="Email"

        />
        <Field
          name="review"
          label="Review"
          placeholder="Review"

        />
        



      </Fields>

      {/* <UpdateForm
        title="Review Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if(values.customername===""||values.email===""||values.review==""){
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
      /> */}
    </CRUDTable>
    <Footer></Footer>
  </div>
  </body>
);
export default Admin_Review;