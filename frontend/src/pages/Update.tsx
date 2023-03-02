import { useState } from 'react';
import axios from 'axios';
import UpdateTable, { Actor } from "../components/UpdateTable";

const Update = () => {
  const [name, setName] = useState("");
  let [data, setData] = useState<Actor[]>();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // alert(`The name you entered was: ${firstName} ${lastName}`)
    const actorName = name
    axios.get(`http://localhost:8080/actors/search/${actorName}`).then((response) => {
      setData(response.data)
    }).catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

  return (
    <div>
      <h1>Update</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter actor first or last name:
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br></br><br></br>
        <input type="submit" />
      </form>
      {!data ? "" :  
          <UpdateTable 
          data = {data}
      />}
    </div>
  )
};
  
  export default Update;