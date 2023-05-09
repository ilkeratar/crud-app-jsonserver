import { createContext, useState } from "react";
import axios from 'axios';

const JobsContext=createContext();

function Provider({children}) {
    const [jobs, setJobs] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const createJob=async (title,desc,priority)=>{
        const response=await axios.post('http://localhost:3003/jobs',{
            title:title,
            description:desc,
            priority:priority,
        });

        const createdJob = [...jobs, response.data];
        setJobs(createdJob);
    }
    const searchJob=(searchTerm)=>{
      axios.get(`http://localhost:3003/jobs?q=${searchTerm}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => console.log(error));
    }
    const editJobById = async (id, updatedTitle, updatedJobDesc,updatedPriority) => {
        await axios.put(`http://localhost:3003/jobs/${id}`, {
          title: updatedTitle,
          description: updatedJobDesc,
          priority:updatedPriority,
          id:id,
        });
        const updatedJob = jobs.map((job) => {
          if (job.id === id) {
            return {title: updatedTitle, description: updatedJobDesc,priority:updatedPriority, id:id};
          }
          return job;
        });
        setJobs(updatedJob);
      };
    const deleteJob=async(id)=>{
        await axios.delete(`http://localhost:3003/jobs/${id}`);
        const afterDeletingJobs = jobs.filter((job) => {
            return job.id !== id;
          });
          setJobs(afterDeletingJobs);
    }
    const fetchJobs=async ()=>{
        const response= await axios.get('http://localhost:3003/jobs');
        setJobs(response.data)
    };
    const fetchPriorities=async ()=>{
        const response= await axios.get('http://localhost:3003/priority');
        setPriorities(response.data)
    };

    const sharedObjects={
        jobs,
        fetchJobs,
        createJob,
        fetchPriorities,
        priorities,
        deleteJob,
        editJobById,
        searchJob,
        searchResults,
    };

    return <JobsContext.Provider value={sharedObjects}>
        {children}
    </JobsContext.Provider>;
}

export {Provider};
export default JobsContext;