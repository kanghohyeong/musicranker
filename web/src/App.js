import React from "react";
import './App.css';
import {
    Routes,
    Route,
} from "react-router-dom";
import Login from "./auth/Login";
import NotFound from "./error/NotFound";
import Chart from "./chart/Chart";
import ChartList from "./chart/ChartList";
import Welcome from "./Welcome";

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/chart/:chartId"} element={<Chart/>}/>
            <Route path={"/chart"} element={<ChartList/>}/>
            <Route path={"/"} element={<Welcome/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
