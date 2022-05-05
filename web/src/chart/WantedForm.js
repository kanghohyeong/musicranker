import React, {useState} from 'react';
import styled from "styled-components";
import {STYLE} from "../const/style";

function WantedForm(props) {
    const [wantedMusic, setWantedMusic] = useState(
        {singer: "", title: "", videoId: ""});

    const addWantedMusic = (e) => {
        e.preventDefault();

        for (let value of Object.values(wantedMusic)) {
            value.trim();
            if (!value) {
                alert("부적절한 입력입니다");
                return;
            }
        }

        fetch("/api/chart/1/wanted", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wantedMusic)
        }).then(res => {
            if (res.ok) {
                window.location.reload();
            } else {
                alert("서버 애러. 연락 바랍니다")
            }
        })
    }

    return (
        <PostForm>
            <InputContainer>
                <label>아티스트</label>
                <input type={"text"} value={wantedMusic.singer} onChange={(e) => {
                    setWantedMusic({...wantedMusic, singer: e.target.value})
                }}/>
            </InputContainer>
            <InputContainer>
                <label>제목</label>
                <input type={"text"} value={wantedMusic.title} onChange={(e) => {
                    setWantedMusic({...wantedMusic, title: e.target.value})
                }}/>
            </InputContainer>
            <InputContainer>
                <label>유튜브 비디오 ID</label>
                <input type={"text"} value={wantedMusic.videoId} onChange={(e) => {
                    setWantedMusic({...wantedMusic, videoId: e.target.value})
                }}/>
            </InputContainer>
            <button type={"submit"} onClick={(e) => addWantedMusic(e)}>대기열 추가
            </button>
            <p style={{fontSize: "8px"}}>유듀브 비디오 ID란? :
                https://www.youtube.com/watch?v=<strong
                    style={{color: "red"}}>G1JQd78ZJ2I</strong>
            </p>
        </PostForm>
    );
}



const PostForm = styled.form`
  width: ${STYLE.MIN_WIDTH};
  border: 1px solid darkgrey;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 30px;
  align-items: center;

  input {
    width: 300px;
  }
`
export default WantedForm;