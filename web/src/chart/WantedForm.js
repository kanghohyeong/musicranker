import React, {useState} from 'react';
import styled from "styled-components";
import {COLOR, STYLE} from "../const/style";

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
                <label>Artist</label>
                <input type={"text"} value={wantedMusic.singer} onChange={(e) => {
                    setWantedMusic({...wantedMusic, singer: e.target.value})
                }}/>
            </InputContainer>
            <InputContainer>
                <label>Title</label>
                <input type={"text"} value={wantedMusic.title} onChange={(e) => {
                    setWantedMusic({...wantedMusic, title: e.target.value})
                }}/>
            </InputContainer>
            <InputContainer>
                <label>Video ID</label>
                <input type={"text"} value={wantedMusic.videoId} onChange={(e) => {
                    setWantedMusic({...wantedMusic, videoId: e.target.value})
                }}/>
            </InputContainer>
            <div onClick={(e) => addWantedMusic(e)}
                 style={{
                     width: "100px",
                     height: "30px",
                     borderRadius: "10px",
                     textAlign: "center",
                     lineHeight: "30px",
                     backgroundColor: COLOR.PRIMARY_GOLD,
                     cursor:"pointer"
                 }}>ADD
            </div>
            <p style={{fontSize: "8px"}}>What is Video ID? :
                https://www.youtube.com/watch?v=<strong
                    style={{color: "red"}}>G1JQd78ZJ2I</strong>
            </p>
        </PostForm>
    );
}


const PostForm = styled.form`
  width: calc(${STYLE.MIN_WIDTH} - 20px);
  margin: 0 auto;
  border: 1px solid darkgrey;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(${STYLE.MIN_WIDTH} - 30px);
  height: 30px;
  align-items: center;

  input {
    width: 300px;
    background-color: ${COLOR.SECONDARY_BLACK};
  }
`
export default WantedForm;