import { useState } from 'react';
import axios from 'axios';
import TableComp, {Actor} from "../components/TableComp";

const Delete = () => {
  const [actorId, setActorId] = useState("");
  let [data, setData] = useState<Actor[]>();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // alert(`The name you entered was: ${firstName} ${lastName}`)
    const deleteId = actorId
    axios.delete(`http://localhost:8080/actors/${deleteId}`).then((response) => {
      setData(response.data)
    }).catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

  return (
    <div>
      <h1>Delete</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter actor ID:
          <input
            type="text" 
            value={actorId}
            onChange={(e) => setActorId(e.target.value)}
          />
        </label>
        <br></br><br></br>
        <input id="button" type="submit" />
      </form>
      {!data ? "" : 
          <h1>User Deleted</h1> 
      }
      {!data ? "" :  
                <TableComp 
                data = {data}
            />}
    </div>
  )
};
  
  export default Delete;