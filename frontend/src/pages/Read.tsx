import useSWR from "swr";
import TableComp from "../components/TableComp";


export const ENDPOINT = "http://localhost:8080";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

const Read = () => {
    const { data, mutate } = useSWR("actors/", fetcher);

    return (
        <div>  
            <h1>Read</h1>

            {!data ? "loading" :  
                <TableComp 
                data = {data}
            />}
        </div>  
    );
}
  
  export default Read;