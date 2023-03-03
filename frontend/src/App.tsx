import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Layout from "./pages/Layout";
import Read from "./pages/Read";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import Play from "./pages/Play";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Create" element={<Create />} />
          <Route path="Read" element={<Read />} />
          <Route path="Update" element={<Update />} />
          <Route path="Delete" element={<Delete />} />
          <Route path="Play" element={<Play />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}