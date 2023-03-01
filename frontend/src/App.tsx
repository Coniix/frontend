import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";
import "./App.css";


export const ENDPOINT = "http://localhost:8080";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR("actors/", fetcher);

  return (
      <p>{JSON.stringify(data)} </p>
  );
}

export default App;
