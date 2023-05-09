import "./App.css";
import SearchBar from "./components/SearchBar";
import Tables from "./components/Tables";

import { useEffect,useContext, useState } from "react";
import JobsContext from "./context/job";
import Modal from "./components/Modal/Modal";

function App() {
  const {fetchJobs,fetchPriorities} = useContext(JobsContext);
  const [modal, setModal] = useState(false);

  const toggleModal=()=>{
    setModal(!modal);
  }


  useEffect(() => {
    fetchJobs();
    fetchPriorities();
  }, [])

  return (
    <div className="App">
      <div className="mainPanel">
        <button className="btn-modal" onClick={toggleModal}>Add job</button>
        <SearchBar />
        <Tables/>
        {modal && (
          <Modal toggleModal={toggleModal}/>
        )}

      </div>
    </div>
  );
}

export default App;
