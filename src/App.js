import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditCard from "./components/EditCard";
import NewCard from "./components/NewCard";
import AppContainer from "./AppContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route path="new" element={<NewCard />} />
          <Route path="edit/:cardId" element={<EditCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}