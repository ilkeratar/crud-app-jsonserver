import React, { useContext,useState } from "react";
import JobsContext from "../context/job";
import Modal from "./Modal/Modal";
function Tables() {
  const {deleteJob,searchResults}=useContext(JobsContext); 
  const [modal, setModal] = useState(false);
  const [job, setJob] = useState();

  const toggleModal=(event,item)=>{
    setJob(item);
    setModal(!modal);
  }

  const handleDelete=(event,id)=>{
    deleteJob(id);
  }
  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {searchResults.map((item,key)=>{
            return(
              <tr key={key} style={{backgroundColor:`${item.priority.color}`}}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.priority.name}</td>
                <td>
                  <button className="editBtn" onClick={event => toggleModal(event,item)}>Edit</button>
                  <button className="deleteBtn" onClick={event =>handleDelete(event,item.id)}>Delete</button>
                </td>
              </tr>
            )
            })}
        </tbody>
      </table>
      {modal && (
          <Modal toggleModal={toggleModal} jobItem={job} jobFormUpdate={true}/>
        )}
    </div>
  );
}

export default Tables;
