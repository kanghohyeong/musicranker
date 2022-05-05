import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {STYLE} from "../const/style";
import WantedForm from "./WantedForm";
import {ReactComponent as ThumbUp} from "../assets/thumb_up.svg";
import {ReactComponent as ThumbDown} from "../assets/thumb_down.svg";

function Chart(props) {

    const [chart, setChart] = useState({
        topMusics: [], title: "로딩중", wantedMusics: [], prevRanking: []
    });

    useEffect(() => {
        fetch("/api/chart/1")
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        setChart(response);
                    })
                } else {
                    alert("서버 애러. 연락 바랍니다")
                }
            });
    }, []);

    const vote = (type, musicId) => {
        fetch(`/api/music/${musicId}/${type}`, {
            method: 'PUT'
        }).then(res => {
            if (res.ok) {
                res.json().then(response => {
                    const topMusics = [...chart.topMusics];
                    const wantedMusics = [...chart.wantedMusics];

                    if (topMusics.some(music => music.id === musicId)) {
                        if (type === "like")
                            topMusics[topMusics.findIndex(music => music.id === musicId)].likeCount = response;
                        else if (type === "dislike")
                            topMusics[topMusics.findIndex(music => music.id === musicId)].dislikeCount = response;
                    }
                    if (wantedMusics.some(music => music.id === musicId)) {
                        if (type === "like")
                            wantedMusics[wantedMusics.findIndex(music => music.id === musicId)].likeCount = response;
                        else if (type === "dislike")
                            wantedMusics[wantedMusics.findIndex(music => music.id === musicId)].dislikeCount = response;
                    }

                    setChart({...chart, topMusics: [...topMusics], wantedMusics: [...wantedMusics]});
                })
            } else {
                alert("서버 애러");
            }
        })
    }


    return (
        <ChartBackgound>
            <h1>{chart.title}</h1>
            <ChartTable>
                <h3>Top 100</h3>
                {chart.topMusics.map((topMusic, idx) => {
                    const prevRank = chart.prevRanking.findIndex(id => id === topMusic.id);
                    let wave = "";
                    if (prevRank > idx) wave = "UP";
                    else if (prevRank === idx) wave = "STAY";
                    else wave = "DOWN";

                    return (
                        <ChartRow key={idx}>
                            <div>
                                <p>{idx + 1}위</p>
                                {{
                                    'UP':<WaveIndicator color={"red"}>상승</WaveIndicator>,
                                    "STAY":<WaveIndicator color={"black"}>--</WaveIndicator>,
                                    "DOWN":<WaveIndicator color={"blue"}>하락</WaveIndicator>,
                                }[wave]}
                            </div>
                            <iframe width={"200px"} height={"100px"}
                                    src={"https://www.youtube.com/embed/" + topMusic.videoId}
                                    title={topMusic.title}/>
                            <p>{topMusic.title}</p>
                            <p>{topMusic.singer}</p>
                            <div>
                                <Vote>
                                    <ThumbUp onClick={() => vote("like", topMusic.id)}/>
                                    <span>{topMusic.likeCount}</span>
                                </Vote>
                                <Vote>
                                    <ThumbDown onClick={() => vote("dislike", topMusic.id)}/>
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
                            <iframe width={"200px"} height={"100px"}
                                    src={"https://www.youtube.com/embed/" + wantedMusic.videoId}
                                    title={wantedMusic.title}/>
                            <p>{wantedMusic.title}</p>
                            <p>{wantedMusic.singer}</p>
                            <div>
                                <Vote>
                                    <ThumbUp onClick={() => vote("like", wantedMusic.id)}/>
                                    <span>{wantedMusic.likeCount}</span>
                                </Vote>
                                <Vote>
                                    <ThumbDown onClick={() => vote("dislike", wantedMusic.i)}/>
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

const WaveIndicator = styled.p`
  color: ${props => props.color};
`

export default Chart;