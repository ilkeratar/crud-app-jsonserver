import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react'
import {FaSearch} from 'react-icons/fa';
import JobsContext from '../context/job';


function SearchBar({props}) {
  const [searchTerm, setSearchTerm] = useState("");
  const {searchJob,jobs} = useContext(JobsContext);
  useEffect(() => {
    searchJob(searchTerm);
  }, [searchTerm,jobs])
  

  return (
    <div className='search-wrapper'>
        <input type="text" placeholder="Search" 
        value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
    </div>
  )
}

export default SearchBar