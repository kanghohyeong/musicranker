import React, {useState} from 'react';
import styled from "styled-components";
import {COLOR, STYLE} from "../const/style";
import {useParams} from "react-router-dom";

function WantedForm(props) {
    const {chartId} = useParams();

    const [wantedMusic, setWantedMusic] = useState(
        {singer: "", title: ""});

    const addWantedMusic = (e) => {
        e.preventDefault();

        for (let value of Object.values(wantedMusic)) {
            value.trim();
            if (!value) {
                alert("부적절한 입력입니다");
                return;
            }
        }

        fetch(`/api/chart/${chartId}/wanted`, {
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
            <div onClick={(e) => addWantedMusic(e)}
                 style={{
                     width: "100px",
                     height: "30px",
                     borderRadius: "10px",
                     textAlign: "center",
                     lineHeight: "30px",
                     backgroundColor: COLOR.PRIMARY_GOLD,
                     cursor: "pointer"
                 }}>ADD
            </div>
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
    width: calc((${STYLE.MIN_WIDTH} - 20px) * 0.6);
    background-color: ${COLOR.SECONDARY_BLACK};
    color: white;
  }
`
export default WantedForm;