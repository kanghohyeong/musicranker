import React from 'react';
import {Outlet} from 'react-router-dom'
import styled from "styled-components";
import {COLOR} from "./const/style";

function Layout(props) {
    return (
        <BaseBackground>
            <Outlet />
        </BaseBackground>
    );
}

const BaseBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.SECONDARY_BLACK};
  position: relative;
`

export default Layout;