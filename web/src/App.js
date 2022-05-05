import React from "react";
import './App.css';
import {
    Routes,
    Route,
} from "react-router-dom";
import Login from "./auth/Login";
import NotFound from "./error/NotFound";
import Chart from "./chart/Chart";

function App() {
  return (
    <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/chart"} element={<Chart />} />
        <Route path={"*"} element={<NotFound />}/>
    </Routes>
  );
}

export default App;
