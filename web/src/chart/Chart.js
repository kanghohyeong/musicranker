import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {STYLE} from "../const/style";
import WantedForm from "./WantedForm";
import {ReactComponent as ThumbUp} from "../assets/thumb_up.svg";
import {ReactComponent as ThumbDown} from "../assets/thumb_down.svg";

function Chart(props) {

    const [chart, setChart] = useState({
        topMusics: [], title: "로딩중", wantedMusics: []
    });

    useEffect(() => {

        fetch("/api/chart/1")
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        setChart(response);
                        console.log(response)
                    })
                } else {
                    alert("서버 애러. 연락 바랍니다")
                }
            });
    }, []);


    return (
        <ChartBackgound>
            <h1>{chart.title}</h1>
            <ChartTable>
                <h3>Top 100</h3>
                {chart.topMusics.map((topMusic, idx) => {
                    return (
                        <ChartRow key={idx}>
                            <p>{idx + 1}위</p>
                            <iframe width={"200px"} height={"100px"}
                                    src={"https://www.youtube.com/embed/" + topMusic.videoId}
                                    title={topMusic.title}/>
                            <p>{topMusic.title}</p>
                            <p>{topMusic.singer}</p>
                            <div>
                                <Vote>
                                    <ThumbUp/>
                                    <span>{topMusic.likeCount}</span>
                                </Vote>
                                <Vote>
                                    <ThumbDown/>
                                    <span>{topMusic.dislikeCount}</span>
                                </Vote>
                            </div>
                        </ChartRow>
                    )
                })}
            </ChartTable>
            <ChartTable>
                <h3>신규 진입 대기열</h3>
                {chart.wantedMusics.map((wantedMusic, idx) => {
                    return (
                        <ChartRow key={idx}>
                            <p>{idx}위</p>
                            <iframe width={"200px"} height={"100px"}
                                    src={"https://www.youtube.com/embed/" + wantedMusic.videoId}
                                    title={wantedMusic.title}/>
                            <p>{wantedMusic.title}</p>
                            <p>{wantedMusic.singer}</p>
                            <div>
                                <Vote>
                                    <ThumbUp/>
                                    <span>{wantedMusic.likeCount}</span>
                                </Vote>
                                <Vote>
                                    <ThumbDown/>
                                    <span>{wantedMusic.dislikeCount}</span>
                                </Vote>
                            </div>
                        </ChartRow>
                    )
                })}
            </ChartTable>
            <WantedForm/>
        </ChartBackgound>
    );
}

const ChartBackgound = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${STYLE.MIN_WIDTH};
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const ChartTable = styled.div`
  width: ${STYLE.MIN_WIDTH};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid darkgrey;
  margin-bottom: 20px;
  padding: 10px 0;
`

const ChartRow = styled.div`
  width: calc(${STYLE.MIN_WIDTH} - 10px);
  display: flex;
  display: flex;
  align-items: center;
  border: 1px solid darkgrey;
  justify-content: space-around;
  background-color: slategrey;
  border-radius: 10px;
`

const Vote = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
    transform: scale(0.6);
  }

  svg:hover {
    fill: red;
  }

`

export default Chart;