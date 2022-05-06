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
import Layout from "./Layout";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<Welcome/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/chart/:chartId"} element={<Chart/>}/>
                <Route path={"/chart"} element={<ChartList/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
