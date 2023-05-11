import React, { useContext } from "react";
import "./Modal.css";
import { Formik } from "formik";
import * as Yup from "yup";
import {AiFillCloseSquare} from 'react-icons/ai'
import { createContext } from "react";
import JobsContext from "../../context/job";


function Modal({ toggleModal ,jobItem,jobFormUpdate }) {
    const {createJob,priorities,editJobById} = useContext(JobsContext);
    
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <AiFillCloseSquare  onClick={toggleModal} className="close-modal"/>
        {jobFormUpdate ? (
           <>
           <h2>Edit job</h2>
        <Formik
          initialValues={{ title:jobItem.title, description:jobItem.description, priority: jobItem.priority.name}}
          validationSchema={Yup.object({
            title: Yup.string().required("This field cannot be left blank"),
            description: Yup.string().required("This field cannot be left blank"),
            priority: Yup.string()
              .required("This field cannot be left blank")
              .oneOf([priorities[0].name, priorities[1].name, priorities[2].name]),
          })}
          onSubmit={(values) => {
            // console.log(jobItem.id);
            const temp= priorities.filter((item)=>item.name===values.priority);
            
            editJobById(jobItem.id,values.title,values.description,temp[0]);
            toggleModal();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="topMargin">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                className="input"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="input-feedback">{errors.title}</div>
              )}
              <label htmlFor="description" className="topMargin">Description</label>
              <textarea
                type="text"
                id="description"
                value={values.description}
                onChange={handleChange}
                className="input"
                cols="10"
                rows="5"
              />
              {errors.description && (
                <div className="input-feedback">{errors.description}</div>
              )}
              <label htmlFor="priority" className="topMargin">Priority</label>
              <select
                type="text"
                id="priority"
                value={values.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="" label="Select an item"></option>
                <option value={priorities[0].name} label={priorities[0].name}></option>
                <option value={priorities[1].name} label={priorities[1].name}></option>
                <option value={priorities[2].name} label={priorities[2].name}></option>
              </select>
              {errors.priority && (
                <div className="input-feedback">{errors.priority}</div>
              )}
              <button className="modalBtn" type="submit" disabled={isSubmitting}>Submit</button>
            </form>
          )}
        </Formik>
           </> 
        ): (
            <>
            <h2>New Job</h2>
        <Formik
          initialValues={{ title: "", description: "", priority: "" }}
          validationSchema={Yup.object({
            title: Yup.string().required("This field cannot be left blank"),
            description: Yup.string().required("This field cannot be left blank"),
            priority: Yup.string()
              .required("This field cannot be left blank")
              .oneOf([priorities[0].name, priorities[1].name, priorities[2].name]),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const temp= priorities.filter((item)=>item.name===values.priority);
            createJob(values.title,values.description,temp[0]);
            toggleModal();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="topMargin">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                className="input"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="input-feedback">{errors.title}</div>
              )}
              <label htmlFor="description" className="topMargin">Description</label>
              <textarea
                type="text"
                id="description"
                value={values.description}
                onChange={handleChange}
                className="input"
                cols="10"
                rows="5"
              />
              {errors.description && (
                <div className="input-feedback">{errors.description}</div>
              )}
              <label htmlFor="priority" className="topMargin">Priority</label>
              <select
                type="text"
                id="priority"
                value={values.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="" label="Select an item"></option>
                <option value={priorities[0].name} label={priorities[0].name}></option>
                <option value={priorities[1].name} label={priorities[1].name}></option>
                <option value={priorities[2].name} label={priorities[2].name}></option>
              </select>
              {errors.priority && (
                <div className="input-feedback">{errors.priority}</div>
              )}
              <button className="modalBtn" type="submit" disabled={isSubmitting}>Submit</button>
            </form>
          )}
        </Formik>
            </>
        )}
        
      </div>
    </div>
  );
}

export default Modal;
