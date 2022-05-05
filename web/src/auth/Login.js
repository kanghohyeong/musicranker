import React from 'react';
import styled from "styled-components";


function Login(props) {
    return (
        <PageBackgound>
            <LoginForm action={"/login"} method={"POST"} >
                <h2>차차차트</h2>
                <label htmlFor={"input-invite-code"}>입장코드</label>
                <input type={"text"} id={"input-invite-code"}/>
                <label htmlFor={"input-name"}>이름</label>
                <input type={"text"} id={"input-name"}/>
                <button type={"submit"}>로그인</button>
            </LoginForm>
        </PageBackgound>
    );
}

const PageBackgound = styled.div`
  background-color: azure;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 300px;
  border: 1px solid darkgrey;
  border-radius: 10px;
  background-color: white;
`

export default Login;