import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import useSWR from "swr";

export interface TableCompProps {
  data: Actor[];
 }
 
 export interface Actor {
  ActorId: number;
  FirstName: string;
  LastName: string;
  LastUpdate: string;
 }

export default function TableComp({data} : TableCompProps) {

    return (
        <div className="App">
        <table>
          <thead>
          <tr>
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
                <td>{actor.ActorId}</td>
                <td>{actor.FirstName}</td>
                <td>{actor.LastName}</td>
                <td>{actor.LastUpdate}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
}