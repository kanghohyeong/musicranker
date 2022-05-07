import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom'
import styled from "styled-components";
import {COLOR} from "./const/style";

function Layout(props) {

    function fillHeight() {
        let vh = window.innerHeight * 0.01;
        document.getElementById("base-background").style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        fillHeight();
    }, []);

    return (
        <BaseBackground id={"base-background"} onResize={fillHeight}>
            <Outlet/>
        </BaseBackground>
    );
}

const BaseBackground = styled.div`
  width: 100%;
  background-color: ${COLOR.SECONDARY_BLACK};
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;
`

export default Layout;