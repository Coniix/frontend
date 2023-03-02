import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import { useState } from 'react';
import axios from 'axios';


export interface TableCompProps {
  data: Actor[];
 }
 
 export interface Actor {
  ActorId: number;
  FirstName: string;
  LastName: string;
  LastUpdate: string;
 }

export default function UpdateTable({data} : TableCompProps) {
  const [actorId, setActorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleOnClick = (value: any) => {
    var obj = null;    
    for (var i = 0; i < data.length; i++) {
        if (data[i].ActorId == value.target.id) {
            obj = data[i];
            break;
        }
    }

    setActorId(value.target.id)
    setFirstName(obj?obj.FirstName:"")
    setLastName(obj?obj.LastName:"")

  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const actorDetails = { firstName: `${firstName}`, lastName: `${lastName}`};
    axios.patch(`http://localhost:8080/actors/${actorId}`, actorDetails).then((response) => {
    }).catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });;
  }

    return (
        <div className="App">
        <table>
          <thead>
          <tr>
            <th>Select</th>
            <th>ActorId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>LastUpdate</th>
          </tr>
          </thead>
          <tbody>
          {data.map((actor) => {
            return (
              <tr key={actor.ActorId}>
                <td><input type="radio" id={actor.ActorId.toString()} name="actor" onClick={handleOnClick}></input></td>
                <td>{actor.ActorId}</td>
                <td>{actor.FirstName}</td>
                <td>{actor.LastName}</td>
                <td>{actor.LastUpdate}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <br></br><br></br>
        {!firstName ? "" :
        <form onSubmit={handleSubmit}>
          <label>Enter new first name:
            <input
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br></br><br></br>
          <label>Enter new last name:
            <input
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br></br><br></br>
          <input type="submit" />
        </form>}
      </div>
    );
}